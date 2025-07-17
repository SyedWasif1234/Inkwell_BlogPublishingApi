import { Posts } from "../post/post.model.js";

//get list of all pending posts
export async function List_Pending_posts(req,res){
    try {
        const All_Posts = await Posts.find();

        const Pending_Posts =  All_Posts.filter(post=> post.status==="PENDING")
        if(!Pending_Posts){
            return res.status(400).json({
                message:"no pending post left"
            })
        }
        console.log("Pending posts :",Pending_Posts)
        res.status(200).json({
            success:true,
            message:"pending posts fetched successfully",
            posts:Pending_Posts
        })
    } catch (error) {
        console.log("error occured while fetching the pending posts:",error)
        res.status(500).json({
            message:"error occured while fetching the pending posts",
            error
        })
    }
}

//get single post of given post id
export async function Get_Pending_post(req,res){
    try {
        const{post_id}= req.params;
        const post = await Posts.findById(post_id).populate([
            { path: "User", select: "name email" },         // select specific fields
            { path: "category", select: "name" }
        ]);

        if(!post){
            return res.status(404).json({
                message:"no post found"
            })
        }

        res.status(200).json({
            success:true,
            message:"post fetched successfully",
            post:post
        })

    } catch (error) {
        console.log("error occured while fetching the pending posts in admin section:",error)
        res.status(500).json({
            message:"error occured while fetching the pending posts in admin section",
            error
        })
    }
    
}

export async function Approve_post(req,res){
    try {

        const{post_id}= req.params;
        const post = await Posts.findByIdAndUpdate(post_id ,
            {status:"APPROVED"},
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:"pending post Approved successfully",
            post:post
        })
        
    } catch (error) {
        console.log("error occured while approving the pending posts:",error)
        res.status(500).json({
            message:"error occured while approving the pending posts",
            error
        })
    }
}

export async function Reject_post(req,res){
    try {

        const{post_id}= req.params;
        const post = await Posts.findByIdAndUpdate(post_id ,
            {status:"REJECTED"},
            {new:true}
        );

        res.status(200).json({
            success:true,
            message:"pending post rejected ",
            post:post
        })
        
    } catch (error) {
        console.log("error occured while rejecting the pending posts:",error)
        res.status(500).json({
            message:"error occured while rejecting the pending posts",
            error
        })
    }
}

