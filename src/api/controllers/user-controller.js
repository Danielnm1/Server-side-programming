import bcrypt from 'bcrypt';
import {
  addUser,
  findUserById,
  listAllUsers,
  modifyUser,
  removeUser,
} from '../models/user-model.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error('Käyttäjää ei löytynyt');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const result = await addUser(req.body);
    if (!result) {
      const error = new Error('User creation failed');
      error.status = 400;
      return next(error);
    }
    res.status(201).json({ message: 'New user added.', result });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const targetUserId = Number(req.params.id);
    const loggedInUser = res.locals.user;

    if (loggedInUser.user_id !== targetUserId && loggedInUser.role !== 'admin') {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    }

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const result = await modifyUser(req.body, targetUserId);
    if (!result) {
      const error = new Error('User not found.');
      error.status = 404;
      return next(error);
    }

    res.json({ message: 'User updated successfully.' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const targetUserId = Number(req.params.id);
    const loggedInUser = res.locals.user;

    if (loggedInUser.user_id !== targetUserId && loggedInUser.role !== 'admin') {
      const error = new Error('Forbidden');
      error.status = 403;
      return next(error);
    }

    const result = await removeUser(targetUserId);
    if (!result) {
      const error = new Error('User not found.');
      error.status = 404;
      return next(error);
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, getUserById, postUser, putUser, deleteUser };