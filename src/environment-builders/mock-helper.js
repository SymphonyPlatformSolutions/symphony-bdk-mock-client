const UI_BUTTONS = {
  'single-user-im': 'IM',
  'multi-user-im': 'MIM',
  room: 'ROOM',
};

class SymphonyMockHelper {
  madeServices = [];

  implementation = {};

  uiButtons = {
    IM: [],
    MIM: [],
    ROOM: [],
  };

  modalHandler;

  addToMadeServices(service) {
    this.madeServices.push(service);
  }

  setModalHandler(callback) {
    this.modalHandler = callback;
  }

  getMadeServices() { return this.madeServices; }

  getModalHandler() {
    return this.modalHandler;
  }

  addUiButton(type, id, controller, info) {
    if (!UI_BUTTONS[type]) { return; }
    if (this.uiButtons[UI_BUTTONS[type]].find(el => el.id === id)) { return; }
    this.uiButtons[UI_BUTTONS[type]].push({ ...info, id });
    console.log('ADDED BUTTON', id);
  }

  getUiButtons() {
    return this.uiButtons;
  }

  setImplementation(obj) {
    this.implementation = { ...this.implementation, ...obj };
  }

  getImplementation() {
    return this.implementation;
  }
}
const singletonHelper = new SymphonyMockHelper();
export default singletonHelper;
