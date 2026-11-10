import bcrypt from 'bcrypt';
import {
  addUser,
  findUserById,
  listAllUsers,
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
    if (!user) {
      return res.status(404).json({ message: 'Käyttäjää ei löytynyt' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const result = await addUser(req.body);
    if (result) {
      res.status(201).json({ message: 'New user added.', result });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putUser = async (req, res) => {
  try {
    const targetUserId = Number(req.params.id);
    const loggedInUser = res.locals.user;

    if (loggedInUser.user_id !== targetUserId && loggedInUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const result = await modifyUser(req.body, targetUserId);
    if (result) {
      res.json({ message: 'User updated successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const targetUserId = Number(req.params.id);
    const loggedInUser = res.locals.user;

    if (loggedInUser.user_id !== targetUserId && loggedInUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const result = await removeUser(targetUserId);
    if (result) {
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };