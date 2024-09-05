import { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser {
  name: string;
  email: string;
  password: string;
  refreshToken: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", userSchema);
export { User, IUser };
