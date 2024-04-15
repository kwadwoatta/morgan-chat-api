<p align="center">
  <img src="./assets/morgan.png" width="200" alt="Morgan Chat Logo" /></a>
</p>

<p align="center">Morgan Chat API is a robust backend service designed to simplify financial data. It leverages Google's Gemini LLM for translating complex financial jargon into simple, understandable language.</p>
<p align="center">
<!-- <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a> -->
  <a href="https://twitter.com/kwadwotheatta" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

<p align="center">Built with NestJS, it provides a scalable and efficient server-side application. The API uses gRPC for high-performance remote procedure calls, Drizzle ORM for handling database operations, and pgvector for efficient vector search and similarity ranking. This API forms the backbone of the Morgan Chat project, powering its ability to make financial data accessible to everyday people.</p>

## Installation

```bash
  pnpm install
```

## Running the app

  ```bash
  # development
  ```

1. ```bash
   git clone https://github.com/kwadwoatta/morgan-chat-api.git
   ```

2. ```bash
   copy .env.example to .env and fill them out
   ```

3. ```bash
   pnpm install
   ```

4. ```bash
   docker compose up dev-db redis -d
   ```

5. ```bash
   pnpm drizzle-kit generate:pg
   ```

6. ```bash
   pnpm tsx db/migrate.ts
   ```

7. ```bash
   pnpm start:dev ai
   ```

8. ```bash
   pnpm start:dev gateway
   ```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Stay in touch

- Author - [Prince Ofori](https://princeofori.webflow.io)
- Twitter - [@KwadwoTheAtta](https://twitter.com/KwadwoTheAtta)

## License

Morgan Chat API is [MIT licensed](LICENSE).
