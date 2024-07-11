import express from "express"
import { createPost,getPost,deletePost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";
const router=express.Router();
router.get("/:id",protectRoute,getPost)

router.post("/create",protectRoute,createPost)
router.delete("/:id",protectRoute,deletePost)

export default router;