import { Router } from "express";
import { isAdmin } from "../controllers/auth";
import { createNewUser, getAllUsers } from "../controllers/user";
const route = Router();

// User Routes
const userAPI = '/user';
route.get(`${userAPI}/all`, isAdmin, getAllUsers);
route.post(`${userAPI}/new`, createNewUser);
// route.put("/user/:userId", updateUser);
// userRoutes.get("/orders/user/:userId", userPurchaseList);

export { route };