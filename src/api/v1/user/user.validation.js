const { body } = require("express-validator");


const createUserValidation = () =>{
    [
    body(
      "username",
      "Username is required and needs to be at least 5 characters long"
    ).isLength({ min: 5 }),
    body(
      "username",
      "Username must contain only alphanumeric characters"
    ).isAlphanumeric(),
    body("password", "Password is required")
      .not()
      .isEmpty(),
    body("email", "Email does not appear to be valid").isEmail()
  ]
}

const updateUserValidation = () => {
    [
    check(
      "username",
      "Username is required and needs to be at least 5 characters long"
    ).isAlphanumeric(),
    check(
      "username",
      "Username must contain only alphanumeric characters"
    ).isAlphanumeric(),
    check("password", "Password is required")
      .not()
      .isEmpty(),
    check("email", "Email does not appear to be valid").isEmail()
  ]
}

module.exports ={
  createUserValidation,
  updateUserValidation
}