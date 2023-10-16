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

function setupRoutes(app: any) {
	app.use("/api/v1", APIs);
}

/** Create Middleware to pass scraped data to every request */
function setScrapedHTML(data: any) {
	return function (request: any, response: Response, next: NextFunction) {
		request.scrapedHTML = data;
		next();
	};
}

/** Setup global middleware */
function setupMiddleware(app: any, data: any) {
	app.use(cors());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(setScrapedHTML(data));
}

export function bootstrapApp(app: any, data: any) {
	setupMiddleware(app, data);
	setupRoutes(app);
}
