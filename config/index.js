import dotenv from "dotenv";

dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.evn.JWT_EXPIRY || "7d",
};

export default config;
