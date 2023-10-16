import puppeteer from "puppeteer";
import { isValidUrl } from "./helpers";

/**
 * RETRIEVE HTML FROM URL
 */

export async function fetchHTML(url: string) {
	try {
		/** Validate url */
		if (!isValidUrl(url)) {
			return null;
		}

		/** Launch an instance of the browser */
		const browser = await puppeteer.launch({
			headless: "new",
		});

		/** Visit the url */
		const page = await browser.newPage();
		console.log("\nStarted Fetching HTML for:\n", url);
		await page.goto(url);

		/** Get HTML content of the page */
		const pageHTML: string = await page.evaluate(() => {
			return document.documentElement.innerHTML;
		});

		/** Close browser for memory leaks & return page HTML */
		await browser.close();
		console.log("\nCompleted Fetching HTML for:\n", url);
		return pageHTML;
	} catch (err: any) {
		console.error(`HTML Fetching Failed ${err}`);
	}
}
