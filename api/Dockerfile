FROM oven/bun:1

WORKDIR /app
COPY package.json package.json
RUN bun install

COPY . .
RUN bun run build

EXPOSE 8001/tcp
ENTRYPOINT [ "bun", "run", "src/index.ts" ]