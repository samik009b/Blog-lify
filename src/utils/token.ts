import jwt, { SignOptions, Secret } from "jsonwebtoken";

// ensuring string type
const asExpires = (value: string | undefined, fallback: string): SignOptions["expiresIn"] => {
  return (value ?? fallback) as SignOptions["expiresIn"];
};

export default {
  createRefreshToken: (payload: any): string => {
    const secret = process.env.REFRESH_TOKEN_SECRET as Secret;
    const refreshTokenExpiry = asExpires(process.env.REFRESH_TOKEN_EXPIRY, "7d");
    const options: SignOptions = {
      expiresIn: refreshTokenExpiry
    };
    return jwt.sign(payload, secret, options);
  },
  createAccessToken: (payload: string): string => {
    const secret = process.env.ACCESS_TOKEN_SECRET as Secret;
    const accessTokenExpiry = asExpires(process.env.ACCESS_TOKEN_EXPIRY, "15m");
    const options: SignOptions = {
      expiresIn: accessTokenExpiry
    };
    return jwt.sign(payload, secret, options);
  }
};
