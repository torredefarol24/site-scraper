import { load } from "cheerio";
import { NextFunction, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export async function scrape(request: any, response: Response, next: NextFunction) {
	try {
		const $ = load(request.scrapedHTML.ryans);
		return response.status(StatusCodes.OK).json({
			message: ReasonPhrases.OK,
		});
	} catch (err: any) {
		console.error(`Error:: Ryans Scrape Controller :: ${err}`);
		return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: ReasonPhrases.INTERNAL_SERVER_ERROR,
		});
	}
}
