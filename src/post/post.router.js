import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middelware.js"; 
import { 
    All_published_post,
    createPost, 
    Delete_post, 
    Edit_post, 
    Get_All_published_posts_of_logedIn_user, 
    Get_Post 
} from "./post.controller.js";


const PostRouter = Router();

PostRouter.post("/create-post/:categoryId",authMiddleware,createPost )
PostRouter.get("/Get_Post",authMiddleware,Get_Post )
PostRouter.get("/published-post",authMiddleware,Get_All_published_posts_of_logedIn_user )
PostRouter.get("/All-published-post", authMiddleware , All_published_post)
PostRouter.put("/edit-post/:post_id",authMiddleware, Edit_post)
PostRouter.delete("/delete-post/:post_id",authMiddleware,Delete_post)




export default PostRouter
