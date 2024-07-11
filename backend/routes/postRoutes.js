import express from "express"
import { createPost,getPost,deletePost,likeUnlikePost,replytoPost,getFeedPosts } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router=express.Router();
router.get("/feed",protectRoute,getFeedPosts)

router.get("/:id",protectRoute,getPost)

router.post("/create",protectRoute,createPost)
router.delete("/:id",protectRoute,deletePost)
router.post("/likes/:id",protectRoute,likeUnlikePost)
router.post("/reply/:id",protectRoute,replytoPost)



export default router;