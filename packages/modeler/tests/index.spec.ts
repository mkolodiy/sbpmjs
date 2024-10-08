import { expect, test } from "@playwright/test";
import type { SbpmModeler } from "../dist/index.js";

declare global {
	interface Window {
		SbpmModeler: SbpmModeler;
	}
}

test.describe("modeler", () => {
	test("init successful", async ({ page }) => {
		await page.goto("http://localhost:5173/");
		const canvas = page.locator("[class='joint-paper joint-theme-default']");
		expect(canvas).toBeDefined();
		expect(canvas).toBeVisible();
		const svg = canvas.locator("svg");
		expect(await svg.getAttribute("height")).toBe("100%");
		expect(await svg.getAttribute("width")).toBe("100%");
	});

	test("should throw an error when container is no defined", async ({
		page,
	}) => {
		await page.goto("http://localhost:5173/invalid-modeler");
		page.on("console", (msg) => console.log(msg.text()));
	});
});

test("has title", async ({ page }) => {
	await page.goto("http://localhost:5173/");

	expect(
		await page.evaluate(() => {
			return window.SbpmModeler.canvas.getElements().length;
		}),
	).toBe(0);

	// await source.dragTo(target);

	await page.evaluate(() => {
		window.SbpmModeler.addSbpmSubject({
			id: "element-3",
			label: "test",
			position: { x: 400, y: 200 },
		});
	});

	const target = page.locator("[model-id='element-3']");
	console.log(target);

	expect(
		await page.evaluate(() => {
			return window.SbpmModeler.canvas.getElements().length;
		}),
	).toBe(1);
});
