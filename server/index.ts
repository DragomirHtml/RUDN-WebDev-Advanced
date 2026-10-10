import express from "express";

const app = express();

const cards = [
    {
      "id": "1",
      "title": "Спроектировать структуру доски",
      "isDone": true,
      "isUrgent": false
    },
    {
      "id": "2",
      "title": "Подключить доску к серверу",
      "isDone": false,
      "isUrgent": true
    },
    {
      "id": "3",
      "title": "Добавить фильтр выполненных карточек",
      "isDone": false,
      "isUrgent": false
    },
    {
      "title": "УРААААААА!!!",
      "isDone": false,
      "isUrgent": false,
      "id": "3x-V8DS_SN4"
    }
  ]

app.get("/cards", (req, res) => {
    res.json(cards);
})

app.listen(3001, () => {
    console.log("Сервер запущен")
});