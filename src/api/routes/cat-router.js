import express from 'express';
import { body, param } from 'express-validator';
import {
  deleteCat,
  getAllCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';
import { upload, createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';
import { validationErrors } from '../../middlewares/error-handlers.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getAllCats)
  .post(
    authenticateToken,
    upload.single('image'),
    body('cat_name')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Cat name must be between 3 and 50 characters')
      .escape(),
    body('weight')
      .isFloat({ min: 0.1 })
      .withMessage('Weight must be a positive number'),
    body('birthdate')
      .isISO8601()
      .toDate()
      .withMessage('Birthdate must be a valid date (YYYY-MM-DD)'),
    validationErrors,
    createThumbnail,
    postCat
  );

catRouter.route('/owner/:userId').get(
  param('userId').isInt({ min: 1 }).withMessage('User ID must be an integer'),
  validationErrors,
  getCatsByUserId
);

catRouter
  .route('/:id')
  .get(
    param('id').isInt({ min: 1 }).withMessage('Cat ID must be an integer'),
    validationErrors,
    getCatById
  )
  .put(
    authenticateToken,
    param('id').isInt({ min: 1 }).withMessage('Cat ID must be an integer'),
    body('cat_name').optional().trim().isLength({ min: 3, max: 50 }).escape(),
    body('weight').optional().isFloat({ min: 0.1 }),
    body('birthdate').optional().isISO8601().toDate(),
    validationErrors,
    putCat
  )
  .delete(
    authenticateToken,
    param('id').isInt({ min: 1 }).withMessage('Cat ID must be an integer'),
    validationErrors,
    deleteCat
  );

export default catRouter;