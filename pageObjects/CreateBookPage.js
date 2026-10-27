import path from "path";

class CreateBookPage {
  constructor(page) {
    this.page = page;
    this.navigateToBookPage = page.getByRole("link", { name: "Books" });
    this.navigateToCreateBookPage = page.getByText("Create New Book", {
      exact: true,
    });
    this.heading = page.getByRole("heading", { name: "Create New Book" });
    this.nameInput = page.locator('input[name="name"]');
    this.descriptionInput = page.locator(
      "//div[contains(@class,'editor-content-area')]//p",
    );
    this.coverImageInput = page.getByText("Cover image");
    this.saveButton = page.getByRole("button", { name: "Save Book" });
  }

  async navigateToBookPage() {
    await this.navigateToBookPage.click();
    await this.page.waitForLoadState("networkidle");
  }

  async navigateToCreateBookPage() {
    await this.navigateToCreateBookPage.click();
    await this.page.waitForLoadState("networkidle");
  }

  async coverImageUpload() {
    const filePath = path.join(__dirname, "assets", "Capture.PNG");
    await this.coverImageInput.setInputFiles(filePath);
    await this.page.waitForLoadState("networkidle");
  }

  async createBook(name, description) {
    await this.nameInput.fill(name);
    await this.descriptionInput.fill(description);
    await this.coverImageUpload();
    await this.saveButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default CreateBookPage;
