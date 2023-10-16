export function isValidUrl(url: string) {
	const newUrl = new URL(url);
	return newUrl.protocol === "http:" || newUrl.protocol === "https:";
}
