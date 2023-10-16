import { load } from "cheerio";
import { NextFunction, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RYANSParams } from "../../../config/platforms";

export async function scrape(request: any, response: Response, next: NextFunction) {
	try {
		/** Begin Scraping*/
		const $ = load(request.scrapedHTML.ryans);
		const $productsWrapper: any = $(RYANSParams.scrapeElements.productWrapper);
		const $products: any = $($productsWrapper[0].children[0].children[0]);

		let title: any = null,
			price: any = null;

		const products = $products[0].children
			.map((card: any, index: any) => {
				/** Locate HTML Element containing item details */
				let itemTitle = card.children[0].children[1].children[0].children[0];
				let itemPrice = card.children[0].children[1];

				/** Check if HTML Structure is valid and contains price */
				if (itemPrice && itemPrice.children[2] && itemPrice.children[2].children[0]) {
					price = itemPrice.children[2].children[0].data;
					price = price ? price.trim().split(" ")[1] : null;
				}

				/** Check if HTML Structure is valid and contains title */
				if (itemTitle && itemTitle.attribs) {
					title = itemTitle.attribs.title;
					title = title ? title.trim() : null;
				}

				/** Parse valid product information */
				const validTitle = title !== null && title.length > 0;
				const validPrice = price !== null && price != RYANSParams.attrWOPrice;
				// const validPrice = price !== null;
				if (validTitle && validPrice) {
					return {
						title,
						price,
					};
				}
			})
			.filter((product: any) => {
				return product && product.title !== null && product.price !== null;
			});

		return response.status(StatusCodes.OK).json({
			message: ReasonPhrases.OK,
			products,
		});
	} catch (err: any) {
		console.error(`Error :: Ryans Scrape Controller :: ${err}`);
		return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: ReasonPhrases.INTERNAL_SERVER_ERROR,
		});
	}
}
