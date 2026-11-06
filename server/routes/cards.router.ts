import {Router} from "express";
import { get, post, remove, toggleDone } from "../controllers/cards.controller.ts";
import { checkCard } from "../middlewares/checkCard.ts";
import { validateDone } from "../middlewares/validateDone.ts";


export const cardsRouter = Router();


cardsRouter.get("/cards", get);

cardsRouter.post(
    "/cards", 
    checkCard,
    post
);

cardsRouter.delete("/card", remove);

cardsRouter.patch("/cards/:id", validateDone, toggleDone);
