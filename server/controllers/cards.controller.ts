import { createCard, deleteCard, getAllCards, toggleCardDone } from "../services/cards.service.ts";
 import type{Request, Response } from 'express';

 export function get(req: Request, res: Response) {
      const ourCards = getAllCards();
  
      res.json(ourCards);
 }


 export function post(req: Request, res: Response){
   const title = req.body.title;
   const newCard = createCard(title);
 
   res.status(201).json(newCard);
 }


export function remove(req: Request, res: Response) {
    const id = req.query.id?.toString();

    if (!id) {
        res.sendStatus(400);
        return;
    }

    const isDeleted = deleteCard(id);

    if (!isDeleted) {
        res.sendStatus(404);
    } else {
        res.sendStatus(204);
    }
}

export function toggleDone(req: Request, res: Response) {
    const id = req.params.id;
    const isDone = req.body.isDone;

    const result = toggleCardDone(id, isDone);

    if (!result) {
        res.sendStatus(404);
        return;
    }

    res.status(200).json(result);
}