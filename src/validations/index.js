import * as validator from "express-validator";

const { body } = validator;

export const validate = (method) => {
  switch (method) {
    case "create-short-code":
      return [
        body("url").isString().notEmpty().withMessage("Url missing").isURL().bail().withMessage('Invalid url provided'),
        body("shortCode").isString().optional(),
      ];

    default:
      break;
  }
};
