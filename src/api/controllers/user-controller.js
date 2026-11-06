import { listAllUsers, findUserById, addUser } from '../models/user-model.js';

const getAllUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = (req, res) => {
  const userId = addUser(req.body);
  if (userId) {
    res.status(201).json({ message: 'New user added.', user_id: userId });
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  res.json({ message: 'User item updated.' });
};

const deleteUser = (req, res) => {
  res.json({ message: 'User item deleted.' });
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };