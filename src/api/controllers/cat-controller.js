import {
  listAllCats,
  findCatById,
  findCatByUserId,
  addCat,
  removeCat,
  modifyCat,
} from '../models/cat-model.js';

// 1. Mark controller function as `async`
const getAllCats = async (req, res) => {
  try {
    // 2. Use `await` to get rows from MySQL
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);
    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// New function required by Assignment 5 (Get cats by owner/user ID)
const getCatsByOwner = async (req, res) => {
  try {
    const cats = await findCatByUserId(req.params.userId);
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postCat = async (req, res) => {
  try {
    console.log('Form body:', req.body);
    console.log('Uploaded file:', req.file);

    const catData = {
      cat_name: req.body.cat_name,
      weight: req.body.weight,
      owner: req.body.owner,
      birthdate: req.body.birthdate,
      filename: req.file ? req.file.filename : null,
    };

    const result = await addCat(catData);
    if (result) {
      res.status(201).json({ message: 'New cat added.', cat_id: result.cat_id });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putCat = async (req, res) => {
  try {
    const result = await modifyCat(req.params.id, req.body);
    if (result) {
      res.json({ message: 'Cat item updated.' });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    const result = await removeCat(req.params.id);
    if (result) {
      res.json({ message: 'Cat item deleted.' });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllCats, getCatById, getCatsByOwner, postCat, putCat, deleteCat };