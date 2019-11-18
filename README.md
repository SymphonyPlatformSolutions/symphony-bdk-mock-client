# Symphony Mock Client
![Alt text](src/assets/symphony-logo.png?raw=true "Mock Client")
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
The mock client application uses the [symphony-api.js](https://www.symphony.com/resources/api/v1.0/symphony-api.js)
provided by symphony
and modify on the fly its inner works so it can be used locally. The resulting object **window.SYMPHONY** available
on any extension app running inside the mock client, is a mocked version of that file.

It also uses the same renderer the real symphony client
uses to present rich data, in the form of messageML or presentationML or extensionML.

As a standalone application, by running ```yarn dev:watch``` the mock client will be launched in the following address https://localhost:5000, its server
set to listen to all network interfaces, meaning that if launched it will be available on your local network.

Once Loaded, it will proxy any calls to actual extension app files to https://localhost:4000, this means that any given
extension app project running ```yarn start:mock``` will automatically be loaded on the mock client (page refresh might
be necessary thought)

> Any calls to a be system wont be proxied, therefore setting CORS on your server is a must.

![Alt text](src/assets/standalone.png?raw=true "Mock client architecture")
<hr/>


## Embedded Architecture

![Alt text](src/assets/bundled.png?raw=true "Mock client architecture while running inside an extension app project")

You may import the mock client into your application, to do so, install this project and be sure to embed the dist
files into your bundle system. like so:

###webpack example:

```jsx harmony
new CopyWebpackPlugin([
  { from: './node_modules/sms-dev-tool-mock-client/dist', to: '' },
]),
```

Your extension app might experience some crashes, if that occours thats probably a racing condition that
presents itself. in order to mitigate that we strongly suggest that you wrap your ```app.js``` logic to check
if the mock client is available, like so:

```jsx harmony
/* global SYMPHONY */
let MOCK_USER_SERVICE = null;

const appWrapper = async () => {
  // These next lines will be removed on production
  /* develblock:start */
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  MOCK_USER_SERVICE = {
    getJwt: () => new Promise(Resolve => Resolve('NO JWT')),
  };
  for (let i = 0; i < 10; i++) {
    console.log('Waiting for Symphony Mock...', i);
    if (window.SYMPHONY.remote.isMock) {
      console.log('Appjs Found it!');
      break;
    }
    await sleep(15);
  }
  console.log('APPJS GOT', window.SYMPHONY);
  /* develblock:end */

  const appService = SYMPHONY.services.register(`${APP_ID}:app`);

  SYMPHONY.remote.hello().then((data) => {
    const themeSize = data.themeV2.size;
    const themeColor = data.themeV2.name;
    document.body.className = `symphony-external-app ${themeColor} ${themeSize}`;
    const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
      ? THEME_TYPES.DARK
      : themeColor.toUpperCase() === THEME_TYPES.LIGHT
        ? THEME_TYPES.LIGHT
        : THEME_TYPES.LIGHT;
    window.themeColor = appTheme;
    window.themeSize = themeSize;

    SYMPHONY.application.connect(
      APP_ID,
      ['modules', 'applications-nav', 'ui', 'extended-user-info', 'extended-user-service', 'dialogs'],
      [`${APP_ID}:app`],
    ).then((response) => {
      const userId = response.userReferenceId;
      const modulesService = SYMPHONY.services.subscribe('modules');
      const extendedUserInfoService = SYMPHONY.services.subscribe('extended-user-info');

      modulesService.addMenuItem(APP_ID, `About ${APP_TITLE}`, `${APP_ID}-menu-item`);
      modulesService.setHandler(APP_ID, `${APP_ID}:app`);
      appService.implement({
        menuSelect: (itemId) => {
          if (itemId === `${APP_ID}-menu-item`) {
            document.getElementById(`about-${APP_ID}-app`).className = '';
          }
        },
      });
      const store = configureStore();
      ReactDOM.render(
        <Provider store={store}>
          <Routes userId={userId} jwtService={MOCK_USER_SERVICE || extendedUserInfoService} />
        </Provider>, document.getElementById('root'),
      );
    }).catch((error) => {
      throw new Error('Unable to connect the application on client', error);
    });
  }).catch((error) => {
    throw new Error('Unable to reach the data for Extension App, please verify the Authentication with Server', error);
  });
};

appWrapper();
``` 


## Running as a cli
run:
```jsx harmony
yarn link
```
![Alt text](src/assets/mock-client-cli.png?raw=true "Mock client architecture while running inside an extension app project")

From the cli you'll be able to point to a particular extension app deployed on any given address and load it on the
mock client. Specially usefull when your app doesnt run on default port **4000**


## Running in development
You'll be able to run the project in development mode

simply run:
```jsx harmony
yarn dev:watch
```

While in this mode, any extension app running on port 4000 will be displayed inside the mock client.

## Build release
Simply run:
```jsx harmony
yarn build:prod
```

That will produce new dist files, that need to be commited, versioned and published.



