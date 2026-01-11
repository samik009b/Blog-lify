import { Document, Types } from "mongoose";

export type THttpResponse = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        url: string;
        method: string;
    };
    message: string;
    data: unknown;
};

export type THttpError = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        url: string;
        method: string;
    };
    message: string;
    data: unknown;
    trace?: object | null;
};

export interface TBlog extends Document {
    author: Types.ObjectId;
    blogName: string;
    content: string;
    createdAt: Date;
    likedBy: number;
}

export interface TUser extends Document {
    name: string;
    username: string;
    role: "user" | "admin";
    email: string;
    password: string;
}
