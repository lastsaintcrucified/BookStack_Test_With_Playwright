import { expect, test } from "@playwright/test";
import POManager from "../pageObjects/POManager.js";
import testDataList from "../utils/TestData.json" with { type: "json" };

const testData = testDataList[0];

test("Create Book Test @createBookTest", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const createBookPage = poManager.getCreateBookPage();

  await loginPage.navigateToLoginPage();
  await loginPage.login();
  await createBookPage.navigateToBookPage();
  await createBookPage.navigateToCreateBookPage();
  await expect(createBookPage.heading.isVisible()).toBeTruthy();
  await createBookPage.createBook(testData.NAME, testData.DESCRIPTION);
  await expect(
    createBookPage.page
      .locator("h1")
      .filter({ hasText: testData.NAME })
      .isVisible(),
  ).toBeTruthy();
  await expect(
    createBookPage.page.getByText(testData.DESCRIPTION).isVisible(),
  ).toBeTruthy();
});
