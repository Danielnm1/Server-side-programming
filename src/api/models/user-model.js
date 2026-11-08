import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT user_id, name, username, email, role FROM wsk_users');
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

const addUser = async (user) => {
  const { name, username, email, password, role } = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [name, username, email, password, role || 'user']);
  if (result.affectedRows === 0) return false;
  return { user_id: result.insertId };
};

const modifyUser = async (id, user) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
  const [result] = await promisePool.execute(sql);
  if (result.affectedRows === 0) return false;
  return true;
};

// Transaction-based user deletion (handles Foreign Key constraint)
const removeUser = async (userId) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Delete associated cats first
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [userId]);

    // 2. Delete user record
    const [result] = await connection.execute('DELETE FROM wsk_users WHERE user_id = ?', [userId]);

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

export { listAllUsers, findUserById, addUser, modifyUser, removeUser };