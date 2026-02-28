import express from "express";
import {
  loginAdmin,
  getMe,
  registerAdmin,
} from "../controllers/auth.controller.js";
import { validateLogin } from "../validators/auth.validator.js";
import { validationResultMiddleware } from "../middlewares/validation.middleware.js";
import { verifyAdminToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

// POST /api/auth/login
router.post("/login", validateLogin, validationResultMiddleware, loginAdmin);

/* register est suprimer apres enregistrement de la route
router.post("/register", registerAdmin);
*/

// GET /api/auth/me
//recupére l'admin connecté
router.get("/me", verifyAdminToken, getMe);

export default router;
