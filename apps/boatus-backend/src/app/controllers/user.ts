/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@boatus/db-access"
import { ErrorResponse, UserResponseTypes } from "@boatus/shared-types";
import jwt = require('jsonwebtoken');
import { RequestHandler } from "express";

export const getAllUsers: RequestHandler<any, UserResponseTypes | ErrorResponse> = (req, res) => {
    db.user.findMany().then((user) => {
        res.send({ message: `Found ${user.length}`, user: user });
    }).catch((err) => {
        res.status(402).send({ message: err.message, error: err });
    })
}

export const getAUser: RequestHandler = (req, res) => {
    db.user.findUnique({
        where: {
            id: Number(req.params.userId)
        }
    }).then((user) => {
        res.send({ message: `Found ${user.name}`, user: user });
    }).catch(error => {
        res.send({ message: error.message, code: error.code, error: error });
    })
}

export const createNewUser: RequestHandler = (req, res) => {
    db.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    }).then(user => {
        //creating token
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
        //put token in cookie
        res.cookie("token", token, { expires: new Date(Date.now() + 9999) });
        res.send({ message: 'New user created successfully!', user: user, token: token });
    }).catch(error => {
        res.send({ message: error.message, error: error, target: error.meta.target?.[0] || '' });
    });
}


export const updateUser: RequestHandler = (req, res) => {
    db.user.update({
        where: {
            id: Number(req.params.userId)
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    }).then(user => {
        res.send({ message: 'User updated successfully!', user: user });
    }).catch(error => {
        res.send({ message: error.message, error: error, target: error.meta.target?.[0] });
    })
}   