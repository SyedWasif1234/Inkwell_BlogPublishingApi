import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middelware.js"; 
import { CheckAdmin } from "../middleware/admin.middleware.js";
import { createCategory, getAllCategory } from "./category.controller.js";


const CategoryRouter = Router();

CategoryRouter.post("/create-category",authMiddleware,CheckAdmin,createCategory)
CategoryRouter.get("/get-category",authMiddleware,getAllCategory)


export default CategoryRouter
