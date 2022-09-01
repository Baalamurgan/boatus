import { Request, NextFunction, Response } from "express";
//eslint-disable-next-line @typescript-eslint/no-var-requires
import jwt = require('jsonwebtoken');

import { db } from "@boatus/db-access"
export const signin = (req: Request, res: Response) => {
    db.user.findUnique({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        //creating token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        //put token in cookie
        res.cookie("token", token, { expires: new Date(Date.now() + 9999) });
        res.send({ message: 'Welcome to boatus-backend!', user: user, token: token });
    }).catch(error => {
        res.send({ message: error.message, error: error });
    });
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(req)
    if (!req)
        return res.status(403).json({
            error: "You are not ADMIN"
        })
    next();
}