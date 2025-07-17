import { Posts } from "./post.model.js";
import { Categories } from "../category/category.model.js";
import { Users } from "../auth/auth.model.js";

export async function createPost(req,res){
    try {

        const user_id = req.user._id;
        const{title , content} = req.body;
        const {categoryId} = req.params;
        console.log("BODY:", req.body)
        console.log(`title:${title}, content:${content}`)
        if(!title || !content) return res.status(400).json("every field is required");

        const category = await Categories.findById(categoryId);

        console.log("category:",category.name)
        const post = await Posts.create({
            title,
            content,
            User:user_id,
            category:category._id,
        })

        res.status(200).json({
            success:true,
            message:"post created",
            post:post
        })
        
    } catch (error) {
        console.log("error occured while creating a post:", error)
        res.status(500).json({message:"error occured while creating post" , error})
    }
}

//ADMIN will use it to approve the post
export async function Get_Post(req,res){
    try {

        const post_id = req.params;
        if(!post_id) return res.status(400).json({message:"post id is required"});
        
        const post = await Posts.findById(post_id);
        if(!post){
            return res.status(400).json({message:"post with this id dosent exists"});
        }

        res.status(200).json({
            success:true,
            message:"post fetched successfully",
            post:post
        })
    } catch (error) {
        console.log("error occured while fetching post :", error)
        res.status(500).json({message:"error occured while fetching post", error})
    }
}

//get all published post of logedin user
export async function Get_All_published_posts_of_logedIn_user(req,res){
    try {

        const user_id = req.user._id;
        const All_Post = await Posts.find().populate("User");

        console.log("all posts :", All_Post)

        const Only_Approved_Posts = All_Post.filter((post)=>{
          return post.status==="APPROVED";
        })

        console.log("only approved posts:",Only_Approved_Posts)

        if(!Only_Approved_Posts){
            return res.status(400).json({
                message:"no posts are approved "
            })
        }

        const Approved_Posts_of_logedIn_User = Only_Approved_Posts.filter((post)=>{
           return post.User===user_id;
        })

        console.log("Approved Posts of logedIn User:", Approved_Posts_of_logedIn_User)

        res.status(200).json({
            success:true,
            message:"approved posts fetched successfully",
            posts:Approved_Posts_of_logedIn_User
        })

    } catch (error) {
        console.log("error occured while fetching all aprooved post :", error)
        res.status(500).json({message:"error occured while fetching all approved post", error})
    }
}

//get all published post of all users
export async function All_published_post(req,res){
    try {

        const All_Post = await Posts.find().populate( { path: "User", select: "name email" })

        console.log("all posts :", All_Post)

        const Only_Approved_Posts = All_Post.filter((post)=>{
           return  post.status==="APPROVED";
        })

        console.log("only approved posts:",Only_Approved_Posts)

        if(!Only_Approved_Posts){
            return res.status(400).json({
                message:"no posts are approved "
            })
        } 

        res.status(200).json({
            success:true,
            message:"approved posts fetched successfully",
            posts:Only_Approved_Posts
        })

        
    } catch (error) {
        console.log("error occured while fetching all aproved post :", error)
        res.status(500).json({message:"error occured while fetching all approved post", error})
    }
}

export async function Edit_post(req,res){
    try {
       
        const {post_id} = req.params;
        const user_id = req.user._id.toString();
        console.log("user Id :",user_id)
        const post = await Posts.findById(post_id).populate( { path: "User", select: "name email" })
        console.log("posted by user id ?",post.User._id.toString())
        if(user_id !== post.User._id.toString()){
            return res.status(400).json({
                message:"unauthorised"
            })
        }

        const {content} = req.body;

        const Edited_post = await Posts.findByIdAndUpdate(
            post_id,
            {content:content},
            {new:true}
        );

        if(!Edited_post){
            return res.status(400).json({
                message:"no post found"
            })
        }

        res.status(200).json({
            success:true,
            message:"post edited successfully",
            post:Edited_post
        })
    } catch (error) {
        console.log("error occured while editing the post :", error)
        res.status(500).json({message:"error occured while editing the post", error})
    }
}

export async function Delete_post(req,res){
    try {
        const {post_id} = req.params;
        const Deleted_post = await Posts.findByIdAndDelete(post_id)

        
         if (!Deleted_post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
             message: 'Post deleted successfully',
             Deleted_post 
         });
    } catch (error) {
        console.log("error occured while deleting the post :", error)
        res.status(500).json({message:"error occured while deleting the post", error})
    }
}



