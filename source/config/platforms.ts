export const DARAZParams = {
	key: "daraz",
	url: "https://www.daraz.com.bd/catalog/?q=rgb+keyboard&_keyori=ss&from=input&spm=a2a0e.searchlist.search.go.3bc4b87ddpWzdU",
	scrapeElements: {
		productWrapper: '[data-qa-locator="general-products"]',
	},
};

export const RYANSParams = {
	key: "ryans",
	url: "https://www.ryanscomputers.com/search?q=rgb%20keyboard",
	scrapeElements: {
		productWrapper: ".recent-view-section",
	},
	attrWOPrice: "0",
};
