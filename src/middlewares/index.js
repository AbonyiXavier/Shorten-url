import { validationResult } from "express-validator";

export const requestValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: false, errors: errors.array({ onlyFirstError: true }) });
  }

  return next()
};
