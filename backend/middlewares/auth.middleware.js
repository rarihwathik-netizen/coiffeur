import jwt from "jsonwebtoken";
import { findAdminById } from "../models/admin.model.js";

export const verifyAdminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifie que l’admin existe encore en base
    const admin = await findAdminById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin non trouvé" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès refusé" });
    }

    req.admin = admin; // stocke l’admin réel
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide" });
  }
};
