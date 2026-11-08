import {
  listAllUsers,
  findUserById,
  addUser,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    const result = await addUser(req.body);
    if (result) {
      res.status(201).json({ message: 'New user added.', user_id: result.user_id });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const result = await modifyUser(req.params.id, req.body);
    if (result) {
      res.json({ message: 'User item updated.' });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Calling removeUser executes the transaction-based deletion in the model
    const result = await removeUser(req.params.id);
    if (result) {
      res.json({ message: 'User item deleted.' });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };