import { db } from "@boatus/db-access"
import { Request, Response } from "express";

export const getAllOrders = (req: Request, res: Response) => {
    db.order.findMany().then((user) => {
        console.log(user)
        res.send({ message: 'Welcome to boatus-backend!', user: user });
    })
}