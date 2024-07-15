FROM oven/bun:1.1.20-alpine as build

WORKDIR /app

COPY package.json .
COPY bun.lockb .
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

FROM oven/bun:1.1.20-alpine as serve

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY package.json .
CMD ["bun", "./build"]
