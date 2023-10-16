import * as bodyParser from "body-parser";
import cors from "cors";
import { NextFunction, Response, Router } from "express";
import { darazEndpoint } from "../modules/daraz/endpoints";
import { ryansEndpoint } from "../modules/ryans/endpoints";

/** Set up endpoints / routes for backend */
const APIs = Router();
const ENDPOINTS = [ryansEndpoint, darazEndpoint];

ENDPOINTS.map((endpoint: any) => {
	APIs.use(`/${endpoint.prefix}`, endpoint.routes);
});

/** Create Middleware to pass scraped data to every request */
function setScrapedData(data: any) {
	return function (request: any, response: Response, next: NextFunction) {
		request.scrapedHTML = data;
		next();
	};
}

export function bootstrapApp(app: any, data: any) {
	/** Setup global middleware */
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(setScrapedData(data));
	app.use("/api/v1", APIs);
}
