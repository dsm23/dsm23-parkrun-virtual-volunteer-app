import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/David Murdoch\'s Virtual Volunteer App/);
});

test("has heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Home",
    }),
  ).toBeVisible();
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.goto("/");

  const accessibilityScanResults = await new AxeBuilder({ page })
    // It's more effort that it's worth to put a landmark on the header, so we disable them for now
    .disableRules("region")
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
