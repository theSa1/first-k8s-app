FROM oven/bun:1.1-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile

EXPOSE 8080

CMD ["bun", "run", "start:migrate"]