import express from 'express';
import {
  createPost,
  deletePost,
  getAllPosts,
  getUserPosts,
  updatePost,
} from '../controllers/post';

export const postRouter = express.Router();

postRouter.get('/all', getAllPosts);
postRouter.get('/all/:userId', getUserPosts);
postRouter.post('/post', createPost);
postRouter.patch('/post/:postId', updatePost);
postRouter.delete('/post/:postId', deletePost);