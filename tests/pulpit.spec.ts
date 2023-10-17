import { test, expect } from "@playwright/test";

test.describe("Pulpit tests", () => {
  const url = "https://demo-bank.vercel.app/";
  const userId = "testuser";
  const userPassword = "12345678";

  test("sucessfull payment with correct data", async ({ page }) => {
    const receiverId = "1";
    const amount = "1";
    const transferTitle = "zwrot";

    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(amount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();

    await expect(
      page.getByText("Przelew wykonany", { exact: true })
    ).toBeVisible();
    await page.getByTestId("close-button").click();
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! Jan Demobankowy - ${amount},00PLN - ${transferTitle}`
    );
  });

  test("sucessfull mobile top-up", async ({ page }) => {
    const mobileAmount = "25";
    const phoneNumber = "500 xxx xxx";
    const topUpConfirmationMsg = "Doładowanie wykonane";
    const successMsg = `Doładowanie wykonane! ${mobileAmount},00PLN na numer ${phoneNumber}`;

    await page.goto(url);
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.locator("#widget_1_topup_receiver").selectOption(phoneNumber);
    await page.locator("#widget_1_topup_amount").fill(mobileAmount);
    await page.locator("#uniform-widget_1_topup_agreement").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await expect(
      page.getByText(topUpConfirmationMsg, { exact: true })
    ).toBeVisible();
    await page.getByTestId("close-button").click();
    await expect(page.locator("#show_messages")).toHaveText(successMsg);
  });
});
