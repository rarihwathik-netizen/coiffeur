import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAdmin } from "../models/admin.model.js";
import { findAdminByEmail, findAdminById } from "../models/admin.model.js";

export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("req.body:", req.body);

    // vérifier si admin existe
    const existingAdmin = await findAdminByEmail(email);
    console.log("existingAdmin:", existingAdmin);

    if (existingAdmin) {
      return res.status(400).json({ message: "admin already exists" });
    }

    // hasher le password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword:", hashedPassword);

    // enregistrer dans la base
    await createAdmin(email, hashedPassword);
    console.log("Admin créé");

    res.status(201).json({ message: "admin created successfully" });
  } catch (error) {
    console.log("Erreur registerAdmin:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await findAdminByEmail(email);
    if (!admin) {
      return res.status(400).json({ message: "email invalid" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "password invalid" });
    }
    const token = jwt.sign(
      { id: admin.id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
export const getMe = async (req, res) => {
  try {
    const admin = await findAdminById(req.admin.id);
    if (!admin) {
      return res.status(404).json({ message: "admin non trouve" });
    }
    res.status(200).json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
};
