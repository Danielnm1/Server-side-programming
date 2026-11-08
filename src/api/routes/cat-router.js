import express from 'express';
import multer from 'multer';
import { createThumbnail } from '../../middlewares/upload.js';

import {
  getAllCats,
  getCatById,
  getCatsByOwner,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

catRouter.route('/').get(getAllCats).post(upload.single('cat'),createThumbnail,postCat);

// Requirement 4: Endpoint to fetch all cats belonging to a specific user/owner
catRouter.route('/owner/:userId').get(getCatsByOwner);

catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;