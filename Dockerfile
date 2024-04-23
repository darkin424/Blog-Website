FROM oven/bun:latest

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/* 

# Install nodejs using n
ARG NODE_VERSION=20
RUN apt update \
    && apt install -y curl
RUN curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n \
    && bash n $NODE_VERSION \
    && rm n \
    && npm install -g n

COPY . .

RUN bun install --frozen-lockfile

RUN bunx prisma generate

#RUN npx prisma migrate dev --name init
EXPOSE 4040

CMD ["bun", "start:migrate:prod"]