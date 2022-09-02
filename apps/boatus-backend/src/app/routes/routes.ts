import { Router } from "express";
import { isAdmin, isAuthenticated, isSignedIn, signin } from "../controllers/auth";
import { createNewUser, getAllUsers, getAUser, updateUser } from "../controllers/user";
const route = Router();

//Auth Routes
route.post('/signin', signin);
// User Routes
const userAPI = '/user';
route.get(`${userAPI}/all`, isSignedIn, isAuthenticated, isAdmin, getAllUsers);
route.get(`${userAPI}/:userId`, getAUser);
route.post(`${userAPI}/new`, createNewUser);
route.patch(`${userAPI}/update/:userId`, updateUser);

export { route };