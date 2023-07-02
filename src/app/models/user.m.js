import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("users", usersSchema);

export default userModel;
