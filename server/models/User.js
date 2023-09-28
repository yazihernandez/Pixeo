import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(        //pass object to Mongoose
  {
    Name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    bio: String,
  },
  { timestamps: true } //automatic timestamps when creating new users
);

const User = mongoose.model("User", UserSchema);
export default User;
