import {
  listAllCats,
  findCatById,
  addCat,
  removeCat,
  modifyCat,
} from '../models/cat-model.js';

const getAllCats = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {

  console.log('Form body:', req.body);
  console.log('Uploaded file:', req.file);

  const catData = {
    ...req.body,
    filename: req.file ? req.file.filename : null,
  };

  const catId = addCat(catData);
  if (catId) {
    res.status(201).json({ message: 'New cat added.', cat_id: catId });
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  // Requirement: return hard-coded message
  res.json({ message: 'Cat item updated.' });
};

const deleteCat = (req, res) => {
  // Requirement: return hard-coded message
  res.json({ message: 'Cat item deleted.' });
};

export { getAllCats, getCatById, postCat, putCat, deleteCat };