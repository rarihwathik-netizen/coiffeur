import { body, param } from "express-validator";

export const createRdvValidator = [
  body(["nom", "prenom"])
    .trim()
    .notEmpty()
    .withMessage("champ obligatoire")
    .isLength({ min: 2, max: 50 })
    .withMessage("nom  et prenom non valide"),

  body("telephone")
    .trim()
    .notEmpty()
    .withMessage("champ obligatoire")
    .isLength({ min: 10, max: 15 })
    .withMessage("numero invalide"),

  body("date_rdv")
    .notEmpty()
    .withMessage("Date obligatoire")
    .isISO8601()
    .withMessage("Format date invalide (YYYY-MM-DD)"),
];

export const updateRdvValidator = [
  param("id").isInt().withMessage("ID invalide"),

  body(["nom", "prenom"])
    .trim()
    .notEmpty()
    .withMessage("Champ obligatoire")
    .isLength({ min: 2, max: 50 })
    .withMessage("Entre 2 et 50 caractères"),

  body("telephone")
    .trim()
    .notEmpty()
    .withMessage("Téléphone obligatoire")
    .matches(/^(05|06|07)[0-9]{8}$/)
    .withMessage("Numéro algérien invalide"),

  body("date_rdv")
    .notEmpty()
    .withMessage("Date obligatoire")
    .isISO8601()
    .withMessage("Format date invalide (YYYY-MM-DD)"),
];

export const idparamValidator = [
  param("id").isInt().withMessage("ID invalide"),
];
