class LoginPage {
  constructor(page) {
    this.page = page;
    // this.userName = page.locator("input[name='username']");
    // this.password = page.locator("input[name='password']");
    this.loginButton = page.getByRole("button", { name: "Log In" });
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.LOGIN_URL);
  }

  async login() {
    // await this.userName.fill(username);
    // await this.password.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
