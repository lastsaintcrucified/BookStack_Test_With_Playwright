import CreateBookPage from "./CreateBookPage";
import LoginPage from "./LoginPage";

class POManager {
  constructor(page) {
    this.page = page;
    this.createBookPage = new CreateBookPage(page);
    this.loginPage = new LoginPage(page);
  }
}

export default POManager;
