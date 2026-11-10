import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query(
    'SELECT user_id, name, username, email, role FROM wsk_users'
  );
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT user_id, name, username, email, role FROM wsk_users WHERE user_id = ?',
    [id]
  );
  if (rows.length === 0) return false;
  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  if (rows.length === 0) return null;
  return rows[0];
};

const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    name,
    username,
    email,
    password,
    role || 'user',
  ]);
  if (result.affectedRows === 0) return false;
  return { user_id: result.insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const [result] = await promisePool.execute(sql);
  if (result.affectedRows === 0) return false;
  return true;
};

const removeUser = async (userId) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Delete associated cats first to satisfy foreign key rules
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);

    // 2. Delete user record
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [userId]
    );

    await connection.commit();
    if (result.affectedRows === 0) return false;
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  modifyUser,
  removeUser,
};