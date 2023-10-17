import { test, expect } from "@playwright/test";

test.describe("Login to demobank", () => {
  // Arrange
  const userId = "testuser";
  const userPassword = "12345678";

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("with correct credentials", async ({ page }) => {
    // Arrange
    const expectedUserName = "Jan Demobankowy";
    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("with too short user name", async ({ page }) => {
    // Arrange
    const shortUserId = "user";
    const errorMsg = "identyfikator ma min. 8 znaków";
    // Act
    await page.getByTestId("login-input").fill(shortUserId);
    await page.getByTestId("password-input").fill(userPassword);
    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(errorMsg);
  });

  test("with too short password", async ({ page }) => {
    // Arrange
    const shortPassword = "1234";
    const errorMsg = "hasło ma min. 8 znaków";
    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(shortPassword);
    await page.getByTestId("password-input").blur();
    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(errorMsg);
  });
});
