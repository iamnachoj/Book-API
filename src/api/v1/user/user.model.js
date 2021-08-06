const mongoose = require("mongoose"); // require mongoose
const bcrypt = require("bcrypt");

let userSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: { type: Date, required: true },
  FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}; //what does the actual hashing of submitted passwords.
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
}; //what compares submitted hashed passwords with the hashed passwords stored in your database.

let User = mongoose.model("User", userSchema);

module.exports = User
