import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.query(
    `SELECT wsk_cats.*, wsk_users.username 
     FROM wsk_cats 
     LEFT JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id`
  );
  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `SELECT wsk_cats.*, wsk_users.username 
     FROM wsk_cats 
     LEFT JOIN wsk_users ON wsk_cats.owner = wsk_users.user_id 
     WHERE cat_id = ?`,
    [id]
  );
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const findCatByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_cats WHERE owner = ?',
    [userId]
  );
  return rows;
};

const addCat = async (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) {
    return false;
  }
  return { cat_id: result.insertId };
};

const modifyCat = async (id, cat, user) => {
  let sql;
  let params;

  if (user.role === 'admin') {
    sql = 'UPDATE wsk_cats SET ? WHERE cat_id = ?';
    params = [cat, id];
  } else {
    sql = 'UPDATE wsk_cats SET ? WHERE cat_id = ? AND owner = ?';
    params = [cat, id, user.user_id];
  }

  const formattedSql = promisePool.format(sql, params);
  const [result] = await promisePool.execute(formattedSql);
  return result.affectedRows > 0;
};

const removeCat = async (id, user) => {
  let sql;
  let params;

  if (user.role === 'admin') {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ?';
    params = [id];
  } else {
    sql = 'DELETE FROM wsk_cats WHERE cat_id = ? AND owner = ?';
    params = [id, user.user_id];
  }

  const [result] = await promisePool.execute(sql, params);
  return result.affectedRows > 0;
};

export {
  listAllCats,
  findCatById,
  findCatByUserId,
  addCat,
  modifyCat,
  removeCat,
};