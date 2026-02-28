import pool from "../config/db.js";

export const createRdv = async (nom, prenom, telephone, date_rdv) => {
  const [result] = await pool.query(
    "INSERT INTO rdv (nom, prenom, telephone, date_rdv) VALUES (?,?,?,?)",
    [nom, prenom, telephone, date_rdv],
  );
  return result.insertId;
};

export const getRdvById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM rdv WHERE id = ?", [id]);
  return rows[0];
};

export const updateRdv = async (id, data) => {
  await pool.query(
    "UPDATE rdv SET nom=? , prenom=? , telephone=? , date_rdv=? WHERE id=?",
    [data.nom, data.prenom, data.telephone, data.date_rdv, id],
  );
};

export const deleteRdv = async (id) => {
  await pool.query("DELETE FROM rdv WHERE id=?", [id]);
};

export const getAllRdvs = async () => {
  const [rows] = await pool.query("SELECT * FROM rdv ORDER BY date_rdv DESC");
  return rows;
};
