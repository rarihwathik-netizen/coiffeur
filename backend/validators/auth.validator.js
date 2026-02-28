import { body } from "express-validator";

export const validateLogin = [
  body("email").isEmail().withMessage("email invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("mot de passe minimum 6 caracteres"),
];
