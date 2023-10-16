import { writeToStream } from "fast-csv";
import { createWriteStream } from "fs";

export function exportToTSV(data: any, name: string) {
	const WS = createWriteStream(`./exports/${name}.tsv`);
	writeToStream(WS, data, { headers: false, delimiter: "\t" });
}
