import express from "express";
import { verifyAdminToken } from "../middlewares/auth.middleware.js";
import { validationResultMiddleware } from "../middlewares/validation.middleware.js";

import {
  createRdvController,
  getRdvByIdController,
  updateRdvController,
  deleteRdvController,
  getAllRdvsController,
} from "../controllers/rdv.controller.js";

import {
  createRdvValidator,
  idparamValidator,
  updateRdvValidator,
} from "../validators/rdv.validator.js";

const router = express.Router();

//créér un rdv
router.post(
  "/",
  createRdvValidator,
  validationResultMiddleware,
  createRdvController,
);

// obtenir un RDV par id (seulement admin)
router.get(
  "/:id",
  verifyAdminToken,
  idparamValidator,
  validationResultMiddleware,
  getRdvByIdController,
);

// lister tous les rdv (seulement admin)
router.get(
  "/",
  verifyAdminToken,
  getAllRdvsController,
);

//modifier un rdv (seul admin)
router.put(
  "/:id",
  verifyAdminToken,
  updateRdvValidator,
  validationResultMiddleware,
  updateRdvController,
);

//supprimé rdv (seulement admin)
router.delete(
  "/:id",
  verifyAdminToken,
  idparamValidator,
  validationResultMiddleware,
  deleteRdvController,
);

export default router;
