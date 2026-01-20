import type { Server } from "node:http";

class ProcessSupervisor {
  private server: Server;
  private db: any;

  constructor(server: Server, db: any) {
    this.server = server;
    this.db = db;
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

      if (this.db) {
        console.log(`[MYSQL] disconnecting database...`);
        await this.db.end();
        console.log(`[MYSQL] database closed`);
      }

      process.exit(isCrash ? 1 : 0);
    } catch (err: any) {
      console.error("[SYSTEM] error during shutdown", err.message);
      process.exit(1);
    }
  }
}

export default ProcessSupervisor;
