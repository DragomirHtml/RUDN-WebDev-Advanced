import type { NextFunction, Request, Response } from "express"

export function validateDone(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (typeof req.body.isDone !== "boolean") {
        res.sendStatus(400);
        return;
    }
    next();
}
