import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  image: string;
  age: number;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  isgooglelogin: boolean;
}

export interface UserUpdate {
  name?: string;
  username?: string;
  age?: Number;
  gender?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, default: "default_username" },
    email: { type: String, required: true },
    password: { type: String, required: false },
    image: { type: String, required: false, default: "/assets/user.svg" },
    isgooglelogin: { type: Boolean, required: true, default: false },
    age: { type: Number, required: false, default: -1 },
    gender: { type: String, required: false, default: "_" },
  },
  { timestamps: true } // Ensure timestamps are enabled
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
