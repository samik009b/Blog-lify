import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    name: string;
    username: string;
    role: "user" | "admin";
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        role: { type: String, default: "user", enum: ["user", "admin"] },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
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

export const userModel = model<IUser>("userModel", UserSchema, "Users");
