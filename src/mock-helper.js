class SymphonyMockHelper {
  madeServices = [];

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
}
const singletonHelper = new SymphonyMockHelper();
export default singletonHelper;
