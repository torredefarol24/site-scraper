import { load } from "cheerio";
import { NextFunction, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { DARAZParams } from "../../../config/platforms";
import { exportToTSV } from "../../../utils/exportToTSV";

export async function scrape(request: any, response: Response, next: NextFunction) {
	try {
		const { key, scraper } = DARAZParams;

		/** Begin Scraping */
		const $ = load(request.scrapedHTML.daraz);
		const $productsWrapper: any = $(scraper.productWrapper);
		const $products = $productsWrapper[0].children;

		let title: any = null,
			price: any = null;

		const products: any = $products.map((item: any, index: any) => {
			/** Locate elements */
			const $titleElement: any = $(scraper.titleSelector)[index];
			const $priceElement: any = $(scraper.priceSelector)[index];

			/** Validate HTML Structure */
			if ($titleElement && $titleElement.attribs) {
				title = $titleElement.attribs.title.trim();
			}

			if ($priceElement && $priceElement.children) {
				price = $priceElement.children[0].data.split(" ")[1];
			}

			return {
				title,
				price,
			};
		});

		exportToTSV(products, key);

		return response.status(StatusCodes.OK).json({
			message: ReasonPhrases.OK,
			products,
		});
	} catch (err: any) {
		console.error(`Error :: Daraz Scrape Controller :: ${err}`);
		return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: ReasonPhrases.INTERNAL_SERVER_ERROR,
		});
	}
}
