import express from 'express';
import {
  getAllCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.route('/').get(getAllCats).post(postCat);
catRouter.route('/:id').get(getCatById).delete(deleteCat).put(putCat);

export default catRouter;