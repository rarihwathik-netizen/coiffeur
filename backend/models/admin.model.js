import pool from "../config/db.js";

export const createAdmin = async (email, password) => {
  const [result] = await pool.execute(
    "INSERT INTO admin (email, password) VALUES (?, ?)",
    [email, password],
  );
  return result;
};

const findAdminByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM admin WHERE email = ? ", [
    email,
  ]);
  return rows[0];
};

const findAdminById = async (id) => {
  const [rows] = await pool.execute("SELECT * FROM admin WHERE id = ?", [id]);
  return rows[0];
};

export { findAdminByEmail, findAdminById };
