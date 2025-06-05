import { getDb } from '../config/db.js';

export const getAllFeedbacks = async () => {
  const db = getDb();
  const [rows] = await db.query('SELECT * FROM feedback');
  return rows;
};

export const getFeedbackById = async (id) => {
  const db = getDb();
  const [rows] = await db.execute('SELECT * FROM feedback WHERE id = ?', [id]);
  return rows[0] || null;
};

export const createFeedback = async (name, email, rating, comments) => {
  const db = getDb();
  const [result] = await db.execute(
    'INSERT INTO feedback (name, email, rating, comments) VALUES (?, ?, ?, ?)',
    [name, email, rating, comments]
  );
  return { id: result.insertId, name, email, rating, comments };
};

export const updateFeedback = async (id, name, email, rating, comments) => {
  const db = getDb();
  const [result] = await db.execute(
    'UPDATE feedback SET name = ?, email = ?, rating = ?, comments = ? WHERE id = ?',
    [name, email, rating, comments, id]
  );
  return result.affectedRows;
};

export const deleteFeedback = async (id) => {
  const db = getDb();
  const [result] = await db.execute('DELETE FROM feedback WHERE id = ?', [id]);
  return result.affectedRows;
};

// Unified service interface
export default {
  listAll: getAllFeedbacks,
  findById: getFeedbackById,
  create: async (feedback) => {
    const { name, email, rating, comments } = feedback;
    return createFeedback(name, email, rating, comments);
  },
  update: async (id, feedback) => {
    const { name, email, rating, comments } = feedback;
    return updateFeedback(id, name, email, rating, comments);
  },
  remove: deleteFeedback
};