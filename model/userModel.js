import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: { type: String, default: "user" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "hotell-user", timestamps: true } // Explicitly set collection name
);

const User = mongoose.model("User", userSchema);
export default User;


