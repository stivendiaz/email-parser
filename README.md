<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This is a project that follows clean architecture and DDD principles it uses the NestJS framework. The project is a mail parser API that reads an email file and returns the JSON data in the email file. The email files are in `eml` format. The API has only one endpoint that takes the file path of the email file as a parameter and returns the JSON data in the email file. 

possible next steps:
- create an endpoint that takes the email file as a parameter and returns the JSON data in the email file.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API Documentation

## Mail Parser API

Note: There are four email files in the `files` directory. The email files are in the `eml` format, if you are using bash, you can use the `pwd` command to get the full path of the `files` directory. like the example below:

```bash
$ cd {reponame}/files
$ ls
attachedfile.eml  emptyemail.eml  innerlinkinbody.eml  linkinbody.eml
$ pwd
/Users/mac/Documents/designli/challenge/files
```

Email types:

- `emptyemail.eml` - email with an empty body and no attachments
- `attachedfile.eml` - email with an attached json file
- `linkinbody.eml` - email with a link in the body that goes to a json
- `innerlinkinbody.eml` - email with a link in the body that goes to a web page that has a link to a json

### GET /mail-parser
 Parameters:
  - `path` (mandatory) - file path to the email file: `string`: `path/files/attachedfile.eml`
 Responses:
  - `200 OK`:
    body:
    ```json
      {
        "data": {
          "name": "John Doe",
          "age": 25,
          "email": "johndoe@example.com",
          "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
          }
        },
        "isArray": false,
        "path": "/mailParser/%2FUsers%2Fmac%2FDocuments%2Fdesignli%2Freal-challenge%2Ffiles%2Femail.eml",
        "duration": "151ms",
        "method": "GET"
      }
      ```
  - `400 Bad Request` - missing `path` parameter
  - `404 Not Found` - json not found
  - `500 Internal Server Error` - internal server error

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
