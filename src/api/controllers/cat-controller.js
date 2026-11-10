import {
  addCat,
  findCatById,
  findCatByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json({
      message: 'Tässä kissat',
      time: req.requestTime,
      data: cats,
    });
  } catch (error) {
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      const error = new Error('Kissaa ei löytynyt');
      error.status = 404;
      return next(error);
    }
    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const getCatsByUserId = async (req, res, next) => {
  try {
    const cats = await findCatByUserId(req.params.userId);
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const postCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Invalid or missing file');
      error.status = 400;
      return next(error);
    }

    req.body.filename = req.file.filename;
    req.body.owner = res.locals.user.user_id;

    const result = await addCat(req.body);
    if (!result) {
      const error = new Error('Failed to add cat');
      error.status = 400;
      return next(error);
    }

    res.status(201).json({ message: 'New cat added.', result });
  } catch (error) {
    next(error);
  }
};

const putCat = async (req, res, next) => {
  try {
    const catId = Number(req.params.id);
    const user = res.locals.user;

    const result = await modifyCat(catId, req.body, user);
    if (!result) {
      const error = new Error('Forbidden or cat not found.');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Cat updated!' });
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = res.locals.user;

    const result = await removeCat(id, user);
    if (!result) {
      const error = new Error('Forbidden or cat not found.');
      error.status = 403;
      return next(error);
    }

    res.json({ message: 'Cat removed!' });
  } catch (error) {
    next(error);
  }
};

export { getAllCats, getCatById, getCatsByUserId, postCat, putCat, deleteCat };