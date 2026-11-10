import express from 'express';
import { body, param } from 'express-validator';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
} from '../controllers/user-controller.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getAllUsers)
  .post(
    body('username')
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters')
      .isAlphanumeric()
      .withMessage('Username must be alphanumeric'),
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('name').optional().trim().escape(),
    validationErrors,
    postUser
  );

userRouter
  .route('/:id')
  .get(
    param('id').isInt({ min: 1 }).withMessage('User ID must be an integer'),
    validationErrors,
    getUserById
  )
  .put(
    authenticateToken,
    param('id').isInt({ min: 1 }).withMessage('User ID must be an integer'),
    body('username')
      .optional()
      .trim()
      .isLength({ min: 3, max: 20 })
      .isAlphanumeric(),
    body('email').optional().trim().isEmail(),
    body('password').optional().trim().isLength({ min: 8 }),
    body('name').optional().trim().escape(),
    validationErrors,
    putUser
  )
  .delete(
    authenticateToken,
    param('id').isInt({ min: 1 }).withMessage('User ID must be an integer'),
    validationErrors,
    deleteUser
  );

export default userRouter;