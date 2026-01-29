import type { Server } from "node:http";

class ProcessSupervisor {
  private server: Server;
  private sequelize;

  constructor(server: Server, sequelize: any) {
    this.server = server;
    this.sequelize = sequelize;
  }

  public initialize(): void {
    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, () => this.handleGracefulShutdown(signal));
    });

    process.on("uncaughtException", (err: Error) => {
      this.handleCrash("uncaughtException", err);
    });

    process.on("unhandledRejection", (reason: unknown) => {
      const error =
        reason instanceof Error ? reason : new Error(String(reason));
      this.handleCrash("unhandleRejection", error);
    });
  }

  private async handleCrash(type: string, error: Error) {
    console.error(`[FATAL ERROR] ${type}`, {
      error: error.message,
      time: new Date().toDateString(),
    });
    await this.handleGracefulShutdown(type, true);
  }

  private async handleGracefulShutdown(
    signal: string,
    isCrash: boolean = false,
  ) {
    console.log(`[SYSTEM] ${signal} received closing resources...`);
    try {
      //set a timer
      const forceExit = setTimeout(() => process.exit(1), 10000);
      forceExit.unref();

      //shut server down
      if (this.server.listening) {
        console.log(`[HTTP] closing server...`);
        await new Promise((resolve) => this.server.close(resolve));
        console.log(`[HTTP] server closed!`);
      }

      if (this.sequelize) {
        console.log(`[SEQUELIZE] disconnecting database...`);
        await this.sequelize.close();
        console.log(`[SEQUELIZE] database closed`);
      }

      process.exit(isCrash ? 1 : 0);
    } catch (err: any) {
      console.error("[SYSTEM] error during shutdown", err.message);
      process.exit(1);
    }
  }
}

export default ProcessSupervisor;
