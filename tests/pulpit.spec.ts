import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  const amount = "1";
  const transferName = "zwrot";

  test("sucessfull payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testuser");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("1");
    await page.locator("#widget_1_transfer_amount").fill(amount);
    await page.locator("#widget_1_transfer_title").fill(transferName);
    await page.getByRole("button", { name: "wykonaj" }).click();

    await expect(
      page.getByText("Przelew wykonany", { exact: true })
    ).toBeVisible();
    await page.getByTestId("close-button").click();
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! Jan Demobankowy - ${amount},00PLN - ${transferName}`
    );
  });

  test("sucessfull mobile top-up", async ({ page }) => {
    const mobileAmount = "25";
    const phoneNumber = "500 xxx xxx";

    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("testuser");
    await page.getByTestId("password-input").fill("12345678");
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption(phoneNumber);
    await page.locator("#widget_1_topup_amount").fill(mobileAmount);
    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await expect(
      page.getByText("Doładowanie wykonane", { exact: true })
    ).toBeVisible();
    await page.getByTestId("close-button").click();
    await expect(page.locator("#show_messages")).toHaveText(
      `Doładowanie wykonane! ${mobileAmount},00PLN na numer ${phoneNumber}`
    );
  });
});
