FROM oven/bun:1

WORKDIR /app
COPY package.json package.json
RUN bun install

COPY . .
RUN bun run build

ENTRYPOINT [ "bun", "run", "src/index.ts" ]