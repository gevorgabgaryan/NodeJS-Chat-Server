import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const config = {
  port: process.env.PORT,
  JWTSecret: process.env.JWT_SECRET || "",
  JWTExpireIn: process.env.JWT_EXPIRE_IN,
};

export default config;
