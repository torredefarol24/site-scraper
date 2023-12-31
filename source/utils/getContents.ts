import { DARAZParams, RYANSParams } from "../config/platforms";
import { fetchHTML } from "./fetchHTML";

/**
 * Get HTML for all platforms - MAKE SURE to call this function ONCE
 * One instance of the application, will call it when the express server starts
 */

export async function getContents() {
	return new Promise(async function (resolve, reject) {
		const darazHTML = await fetchHTML(DARAZParams.url);
		const ryansHTML = await fetchHTML(RYANSParams.url);

		return resolve({
			daraz: darazHTML,
			ryans: ryansHTML,
		});
	});
}
