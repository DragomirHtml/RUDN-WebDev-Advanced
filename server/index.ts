import express from "express";
import { cardsRouter } from "./routes/cards.router.ts";

const app = express();
app.use(cardsRouter);

app.listen(3001);


