import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middelware.js";
import { CheckAdmin } from "../middleware/admin.middleware.js";
import { Approve_post, Get_Pending_post, List_Pending_posts, Reject_post } from "./admin.controller.js";

const AdminRouter = Router();

AdminRouter.get("/List-Pending-Post" , authMiddleware , CheckAdmin , List_Pending_posts );
AdminRouter.get("/Pending-Post/:post_id" , authMiddleware , CheckAdmin , Get_Pending_post)
AdminRouter.put("/approve-Post/:post_id" , authMiddleware , CheckAdmin , Approve_post)
AdminRouter.put("/reject-Post/:post_id" , authMiddleware , CheckAdmin , Reject_post)


export default AdminRouter
