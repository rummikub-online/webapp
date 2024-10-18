import { expect, test } from "@nuxt/test-utils/playwright";

test("can join game from lobby", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });

  await page.getByLabel("Code de la partie").fill("123");

  await page.getByRole("button", { name: "Rejoindre" }).click();

  await expect(page).toHaveURL("/games/123");

  await page.getByLabel("Choisissez un pseudo").fill("userA");

  await page.getByRole("button", { name: "Rejoindre la partie" }).click();

  await expect(page.getByText("userA")).toBeVisible();
});