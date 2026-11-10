import express from 'express';
import multer from 'multer';
import {
  deleteCat,
  getAllCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';
import { createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

// GET all cats / POST new cat (Protected)
catRouter
  .route('/')
  .get(getAllCats)
  .post(authenticateToken, upload.single('image'), createThumbnail, postCat);

// GET cats by owner ID
catRouter.route('/owner/:userId').get(getCatsByUserId);

// GET by ID / DELETE (Protected) / PUT (Protected)
catRouter
  .route('/:id')
  .get(getCatById)
  .delete(authenticateToken, deleteCat)
  .put(authenticateToken, putCat);

export default catRouter;