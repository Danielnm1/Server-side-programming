import {
  addCat,
  findCatById,
  findCatByUserId,
  listAllCats,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getAllCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json({
      message: 'Tässä kissat',
      time: req.requestTime,
      data: cats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (!cat) {
      return res.status(404).json({ message: 'Kissaa ei löytynyt' });
    }
    res.json(cat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCatsByUserId = async (req, res) => {
  try {
    const cats = await findCatByUserId(req.params.userId);
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postCat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Cat image file is required.' });
    }
    req.body.filename = req.file.filename;
    req.body.owner = res.locals.user.user_id;

    const result = await addCat(req.body);
    if (result) {
      res.status(201).json({ message: 'New cat added.', result });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putCat = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = res.locals.user;

    const result = await modifyCat(id, req.body, user);
    if (result) {
      res.json({ message: 'Cat updated!' });
    } else {
      res.status(403).json({ error: 403, message: 'Forbidden or cat not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = res.locals.user;

    const result = await removeCat(id, user);
    if (result) {
      res.json({ message: 'Cat removed!' });
    } else {
      res.status(403).json({ error: 403, message: 'Forbidden or cat not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllCats, getCatById, getCatsByUserId, postCat, putCat, deleteCat };