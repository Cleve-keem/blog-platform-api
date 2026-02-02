# Get node version
FROM node:22.17.1-slim
# Install pnpm globally
RUN npm install -g pnpm
# Create folder in the container
WORKDIR /usr/src/app
# Copy package files
COPY package.json pnpm-lock.yaml* ./
# install dependencies
RUN pnpm install
#
COPY . .
# run on port
EXPOSE 4040
# Copy other files
CMD ["pnpm", "dev"]
