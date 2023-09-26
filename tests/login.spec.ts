import { test, expect } from "@playwright/test";

test.describe("Login to demobank", () => {
  test("with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testuser");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();
    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("with too short user name", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("user");
    await page.getByTestId("password-input").fill("12345678");
    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test("with too short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testuser");
    await page.getByTestId("password-input").fill("1234");
    await page.getByTestId("password-input").blur();
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
