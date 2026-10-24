
import express from "express";
import { createCard, getAllCards, deleteCard } from "./services/cards.service";
const app = express();

app.use(express.json());

app.get("/cards", (req, res) => {
    const ourCards = getAllCards();

    res.json(ourCards);
});

app.post("/cards", (req, res) => {
  const title = req.body.title;
  const newCard = createCard(title);

  res.status(201).json(newCard);
});

app.delete("/cards", (req, res) => {
  const id = req.query.id;

  if (typeof id !== "string") {
    res.sendStatus(400);
    return;
  }

  const isDeleted = deleteCard(id);

  if (!isDeleted) {
    res.sendStatus(404);
  } else {
    res.sendStatus(204);
  }
});

app.listen(3001);
