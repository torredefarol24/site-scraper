import express from "express";
import { SYSTEM_CONF } from "../config/env";
import { getContents } from "../utils/getContents";
import { bootstrapApp } from "./bootstrap";

export class SiteScraper {
	private _api: express.Application;
	private _html: any;

	constructor() {
		this._api = express();
		this.start();
	}

	/** Fetch HTML from different platforms ONCE */
	private retrieveContent() {
		return new Promise(function (resolve, reject) {
			resolve(getContents());
		});
	}

	/** Bootstrap App & Pass Scraped HTML as a property of every request */
	private bootstrap(api: any, html: any) {
		return new Promise<void>(function (resolve, reject) {
			bootstrapApp(api, html);
			resolve();
		});
	}

	/** Start Express server to serve requests */
	private listen() {
		try {
			this._api.listen(SYSTEM_CONF.PORT, () => {
				console.log(`\nServer Listening on port: ${SYSTEM_CONF.PORT}`);
			});
		} catch (err) {
			console.log(`Server Failed to start`);
		}
	}

	private async start() {
		/** STEP 1: First fetch HTML from platforms ONCE*/
		this._html = await this.retrieveContent();

		/** STEP 2: Use scraped HTML allover the app */
		await this.bootstrap(this._api, this._html);

		/** STEP3: Start express server */
		this.listen();
	}
}
