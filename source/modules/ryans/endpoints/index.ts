import { Router } from "express";
import { RYANSParams } from "../../../config/platforms";
import { scrape } from "../controllers/scrape";

const routes = Router();

routes.get("/", scrape);

export const ryansEndpoint = {
	prefix: RYANSParams.key,
	routes,
};
