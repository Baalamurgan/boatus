import { db } from "@boatus/db-access"
import { NextFunction, Request, Response } from "express";

export const getAllUsers = (req: Request, res: Response) => {
    db.user.findMany().then((user) => {
        res.send({ message: `Found ${user.length}`, user: user });
    }).catch((err) => {
        res.send({ message: err.message, error: err });
    })
}

export const getUser = async (req: Request, res: Response, next: NextFunction, id: number) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: id
            }
        })
        res.send({ message: `Found ${user}`, user: user });
    } catch (error) {
        res.send({ message: error.message, error: error });
    }
}

export const createNewUser = (req: Request, res: Response) => {
    db.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    }).then(user => {
        res.send({ message: 'New user created successfully!', user: user });
    }).catch(error => {
        res.send({ message: error.message, error: error, target: error.meta.target[0] || '' });
    });
}