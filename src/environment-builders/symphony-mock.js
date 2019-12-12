import Service from './service';
import singletonHelper from './mock-helper';

const rawRooms = [
  {
    name: 'Room A',
    threadId: 'abc/def//ghi+jkl==',
    memberAddUserEnabled: true,
    userIsOwner: true,
    publicRoom: false,
  },
  {
    name: 'Room B',
    threadId: 'abc/def//ghi+123==',
    memberAddUserEnabled: false,
    userIsOwner: false,
    publicRoom: false,
  },
  {
    name: 'Room C',
    threadId: 'abc/def//ghi+456==',
    memberAddUserEnabled: true,
    userIsOwner: false,
    publicRoom: true,
  },
];

const userContacts = new Map();
const jeanLuc = {
  id: 0,
  name: 'Cpt. Jean Luc Picard',
};

const riker = {
  id: 1,
  name: '1st officer William Riker',
};

const laforge = {
  id: 3,
  name: 'Chief Engineer Lt. La forge',
};

const cmderData = {
  id: 2,
  name: '2nd Officer LT commander Data',
};

userContacts.set('abc_def__ghi-jkl', [jeanLuc, cmderData]);
userContacts.set('abc_def__ghi-123', [jeanLuc]);
userContacts.set('abc_def__ghi-456', [jeanLuc, riker, cmderData, laforge]);

const SUBSCRIPTION_TYPES = {
  ENTITY: 'entity',
  UI: 'ui',
  APPLICATION_NAV: 'applications-nav',
  DIALOG: 'dialogs',
  THEME_WATCHER: 'theme-watcher',
  THEME: 'themes',
  ACCOUNT: 'account',
  EXTENDED_USER_INFO: 'extended-user-info',
};

window.env = {};

const SYMPHONY_MOCK = {
  isMock: true,
  mockHelper: singletonHelper,
  services: {
    makeAnonymousService: () => new Service(),
    register: (str) => {
      console.info(`Registering service -> ${str}`);
      return {
        implement: (implementation, ...args) => {
          console.info('App Service implements called');
          console.log(implementation);
          console.log(args);
          singletonHelper.setImplementation(implementation);
        },
      };
    },
    make: (str, instance) => {
      console.info(`Service make-> ${str}`, singletonHelper.getMadeServices());
      singletonHelper.addToMadeServices({
        name: str,
        instance,
      });
    },
    unsubscribe: (...args) => {
      console.info(`unsubscribing -> ${args}`);
    },
    subscribe: (moduleToBeSubscribed) => {
      console.info(`Subscribing to module -> ${moduleToBeSubscribed}`);

      switch (moduleToBeSubscribed) {
        case SUBSCRIPTION_TYPES.ENTITY: {
          return {
            registerRenderer: (...args) => {
              console.info(`Registering Entity -> ${args}`);
            },
          };
        }
        case SUBSCRIPTION_TYPES.UI: {
          return {
            registerExtension: (...args) => {
              console.info(`Registering Entity -> ${args}`);
              singletonHelper.addUiButton(...args);
            },
            listen: (...args) => {
              console.info(`Listening to ui entity subscription -> ${args}`);
            },
          };
        }
        case SUBSCRIPTION_TYPES.DIALOG: {
          return {
            show: (name, controller, htmlString) => {
              const src = htmlString.match(/src="(.*?)"/)[1];
              const url = src.replace(
                /^[a-z]{4,5}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/,
                '$1',
              );
              const width = htmlString.match(/width="(.*?)"/)[1];
              const height = htmlString.match(/height="(.*?)"/)[1];

              window.dispatchEvent(
                new CustomEvent('openDialog', {
                  detail: {
                    url,
                    width,
                    height,
                  },
                  bubbles: true,
                  cancelable: true,
                }),
              );
              console.warn(`Requesting to open dialog named as -> ${name}`);
            },
            close: () => {
              const handler = singletonHelper.getModalHandler();
              if (handler) {
                setTimeout(handler, 50);
              }
            },
          };
        }

        case SUBSCRIPTION_TYPES.APPLICATION_NAV: {
          return {
            add: (...args) => {
              console.info(`Registering Entity -> ${args}`);
            },
          };
        }

        case SUBSCRIPTION_TYPES.THEME_WATCHER: {
          return {
            getTheme: () => 'light',
          };
        }

        case SUBSCRIPTION_TYPES.THEME: {
          return {
            getActiveThemeInfo: () => ({
              contrast: '',
            }),
          };
        }

        case SUBSCRIPTION_TYPES.ACCOUNT: {
          return {
            getPodId: () => '',
            getDesktopSettings: () => ({
              activeMode: '',
              fontSize: 'normal',
            }),
          };
        }

        case SUBSCRIPTION_TYPES.EXTENDED_USER_INFO: {
          return {
            getJwt: () => {
              console.info('Getting mocked jwt');
              return new Promise(resolve => resolve('mocked-jwt'));
            },
          };
        }

        default: {
          return {
            listen: (eventName) => {
              console.info(`Registered Listener to -> ${eventName}`);
            },
            addMenuItem: (...args) => {
              console.info(`Adding menu Items [${args.join(',')}]`);
            },
            setHandler: (...args) => {
              console.info(`Setting Handler Items [${args.join(',')}]`);
            },
            getRooms: (...args) => {
              console.info(`Getting rooms for [${args.join(',')}]`);
              return new Promise(Resolve => Resolve(rawRooms));
            },
          };
        }
      }
    },
  },
  remote: {
    hello: () => {
      console.log('Calling Symphony Remote Hello');
      const theme = localStorage.getItem('theme-name');
      const size = localStorage.getItem('theme-size');
      return new Promise(Resolve => Resolve({
        pod: 1234,
        themeV2: {
          name: theme || 'LIGHT',
          size: size || 'normal',
        },
      }));
    },
    isMock: true,
  },
  application: {
    connect: (...args) => {
      console.log(`Connecting application ${args}`);
      return new Promise(Resolve => Resolve({
        userReferenceId: 'MockedUser',
      }));
    },
    register: (...args) => {
      console.info(`Registering application ${args}`);
      return new Promise(Resolve => Resolve({
        userReferenceId: 'MockedUser',
      }));
    },
  },
  getContacts: (roomId) => {
    console.info(`Getting contacts for room [${roomId}]`);
    return new Promise(Resolve => Resolve(userContacts.get(roomId)));
  },
  chats: [
    {
      id: 0,
      label: 'CHATS',
      hasAdd: true,
      list: [
        {
          id: 0,
          status: false,
          text: 'Commander Willian Riker',
          icon: null,
        },
        {
          id: 1,
          status: true,
          text: 'LT Commander Data',
          icon: null,
        },
        {
          id: 2,
          status: true,
          text: 'LT La Forge',
          icon: null,
        },
        {
          id: 3,
          status: false,
          text: 'LT Worf',
          icon: null,
        },
        {
          id: 4,
          status: false,
          text: 'Counselor Troi',
          icon: null,
        },
        {
          id: 5,
          status: false,
          text:
            'Commander Willian Riker, LT Commander Data, LT La forge, LT La Worf, Counselor Troi',
          icon: null,
        },
      ],
    },
  ],
};

window.SYMPHONY = Object.assign({}, window.SYMPHONY, SYMPHONY_MOCK);
