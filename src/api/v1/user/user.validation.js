const { body, check } = require("express-validator");


const createUserValidation =
   [
    check("Name", "Username longer than 5 characters is required").isLength({
      min: 5,
    }),
    check(
      "Name",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric("en-US", { ignore: " " }),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ]

const updateUserValidation =
    [
    check("Name", "Username longer than 5 characters is required").isLength({
      min: 5,
    }),
    check(
      "Name",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric("en-US", { ignore: " " }),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail(),
  ]

module.exports ={
  createUserValidation,
  updateUserValidation
}