# Symphony Mock Client

[![Quality Gate Status](https://sonarqube-dev.symphonymarket.solutions/api/project_badges/measure?project=sms-dev-tool-client-mock&metric=alert_status)](https://sonarqube-dev.symphonymarket.solutions/dashboard?id=sms-dev-tool-client-mock) |
**Build status**:
[![CircleCI](https://circleci.com/gh/SymphonyPlatformSolutions/sms-dev-tool-mock-client/tree/master.svg?style=svg&circle-token=65c7cc0be8d286cde915992e18daa81742f20ea0)](https://circleci.com/gh/SymphonyPlatformSolutions/sms-dev-tool-mock-client/tree/master)


## What you'll need
* NodeJS
* Yarn
## Prepare environment

- First you need to install the stable version of [NodeJs](https://nodejs.org/en/)
- Then you need to install yarn ```npm install -g yarn```

## Architecture

![Alt text](src/assets/standalone.png?raw=true "Mock client architecture")
<hr/>

## Embedded Architecture

![Alt text](src/assets/bundled.png?raw=true "Mock client architecture while running inside an extension app project")

## Running as a cli
run:
```jsx harmony
yarn link
```
![Alt text](src/assets/mock-client-cli.png?raw=true "Mock client architecture while running inside an extension app project")

From the cli you'll be able to point to a particular extension app deployed on any given address and load it on the mock client.


## Running in development
You'll be able to run the project in development mode

simply run:
```jsx harmony
yarn dev:watch
```

While in this mode, any extension app running on port 4000 will be displayed inside the mock client.

##Embedding the mock client on existing extension app

In order to achieve this functionality you must include on your bundler the dist files from this project:

webpack example:

```jsx harmony
new CopyWebpackPlugin([
  { from: './node_modules/sms-dev-tool-mock-client/dist', to: '' },
]),
```

## Build release
Simply run:
```jsx harmony
yarn build:prod
```



