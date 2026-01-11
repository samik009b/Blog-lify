import mongoose, { Schema, model } from "mongoose";
import { TUser } from "../config/types";
import bcrypt from "bcrypt";

// user-schema
const UserSchema = new mongoose.Schema<TUser>(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        role: { type: String, default: "user", enum: ["user", "admin"] },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const u = this;
    if (!u.isModified("password")) {
        return;
    }
    const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    u.password = await bcrypt.hash(u.password, saltRounds);
    next();
});

export const userModel = model<TUser>("userModel", UserSchema, "Users");
