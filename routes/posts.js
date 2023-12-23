import express from "express";
import { getFeedPosts, getUserPosts, likePost, hatePost, boomerangPost, deletePost, commentPost, commentReply, likeComment } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/hate", verifyToken, hatePost);
router.patch("/:id/boomerang", verifyToken, boomerangPost);

/* DELETE */
router.delete("/:postId", verifyToken, deletePost);

/* COMMENT ROUTES */
router.patch("/:id/comment", verifyToken, commentPost);
router.patch("/:id/comment-reply", verifyToken, commentReply);

/* LIKE, HATE, BOOMERANG COMMENT ROUTES */
router.patch("/:id/like-comment", verifyToken, likeComment);
// router.patch("/:id/hate-comment", verifyToken, hateComment);
// router.patch("/:id/boomerang-comment", verifyToken, boomerangComment);

export default router;
