import { Router } from "express";
import { DARAZParams } from "../../../config/platforms";
import { scrape } from "../controllers/scrape";

const routes = Router();

routes.get("/", scrape);

export const darazEndpoint = {
	prefix: DARAZParams.key,
	routes,
};
