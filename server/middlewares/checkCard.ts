import type { NextFunction, Request, Response } from "express"

export function checkCard(
    req: Request,
    res: Response,
    next: NextFunction
) {
if (!req.body.title){
    res.sendStatus(400);
    return;
}
next();
}