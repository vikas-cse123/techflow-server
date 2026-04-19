import * as z from "zod";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.safeParse(req.body);

    if (!validationResult.success) {
      const filesErrors = z.treeifyError(validationResult.error).properties;
      const firstErrorByField = {};
      for (const key in filesErrors) {
        firstErrorByField[key] = filesErrors[key].errors[0];
      }

      return res.status(400).json({ success: false, errors: firstErrorByField });
    }
    req.body = validationResult.data;
    next();
  };
};
