FROM oven/bun:1

WORKDIR /app
COPY package.json package.json
RUN bun install

COPY . .
RUN bunx prisma migrate deploy
RUN bunx prisma generate

EXPOSE 8001
ENTRYPOINT [ "bun", "run", "src/index.ts" ]