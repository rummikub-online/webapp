import { expect, test } from "@nuxt/test-utils/playwright";

test("can create game from lobby", async ({ page, goto }) => {
  await goto("/", { waitUntil: "hydration" });

  await page.getByRole("button", { name: "Créer une partie" }).click();

  await expect(page).toHaveURL(/\/games\/\d\d\d/);

  await page.getByLabel("Choisissez un pseudo").fill("userA");

  await page.getByRole("button", { name: "Rejoindre la partie" }).click();

  await expect(page.getByText("userA")).toBeVisible();
});
