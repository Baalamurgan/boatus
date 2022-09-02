import { RequestHandler } from "express";

import { db } from "@boatus/db-access"
import { expressjwt } from "express-jwt";
export const signin: RequestHandler = (req, res) => {
    db.user.findUnique({
        where: {
            email: req.body.email,
        }
    }).then(user => {
        if (req.body.password === user.password) {
            res.send({ message: 'Welcome to Boatus!', user: user });
        }
        else {
            res.send({ message: 'Wrong password' });
        }
    }).catch(error => {
        res.send({ message: error.message, error: error });
    });
}

//protected routes
export const isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

//custom middlewares
export const isAuthenticated: RequestHandler = (req, res, next) => {
    // let checker = rew
    // req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(req);
    // if(!checker){
    //     return res.status(403).json({
    //         error: "ACCESS DENIED",
    //     })
    // }
    next();
}

export const isAdmin: RequestHandler = (req, res, next) => {
    console.log(req.body)
    if (!req)
        return res.status(403).json({
            error: "You are not ADMIN"
        })
    next();
}
