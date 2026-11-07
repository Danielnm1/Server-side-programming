import express from 'express';
import multer from 'multer';

import {
  getAllCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const upload = multer({ dest: 'uploads/' });
const catRouter = express.Router();

catRouter.route('/').get(getAllCats).post(upload.single('cat'),postCat);
catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;