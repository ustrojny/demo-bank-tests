import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("testuser");
  await page.getByTestId("password-input").click();
  await page.getByTestId("password-input").fill("12345678");
  await page.getByTestId("login-button").click();
  await page.getByTestId("user-name").click();
  await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
});
