import { Router } from "express";
import { GenerateApiKey, getUserapiKey, HandleSignup, login } from "./auth.controller.js";
import { authMiddleware } from "../middleware/auth.middelware.js";

const UserRouter = Router();

UserRouter.post("/signup",HandleSignup )
UserRouter.post("/login",login )
UserRouter.post("/generate-api-key",authMiddleware,GenerateApiKey )
UserRouter.get("/getUser-apikey",authMiddleware ,getUserapiKey )




export default UserRouter
