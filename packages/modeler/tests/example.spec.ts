import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("http://localhost:5173");
	// Get all tspan nodes inside this label
	const tspans = page.locator('text[joint-selector="label"] tspan');

	// Get count of tspan elements
	const count = await tspans.count();

	const parts: string[] = [];
	for (let i = 0; i < count; i++) {
		const part = await tspans.nth(i).textContent();
		parts.push(part?.replace(/\u00A0/g, " ").trim() ?? "");
	}

	// Join with space
	const normalized = parts.join(" ").replace(/\s+/g, " ").trim();

	console.log(normalized); // -> "Default process network"

	expect(normalized).toBe("Default process network");
});

test("get started link", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	// Click the get started link.
	await page.getByRole("link", { name: "Get started" }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(
		page.getByRole("heading", { name: "Installation" }),
	).toBeVisible();
});
