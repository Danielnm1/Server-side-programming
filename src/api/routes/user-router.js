import express from 'express';
import {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser);
userRouter.route('/:id').get(getUserById).delete(deleteUser).put(putUser);

export default userRouter;