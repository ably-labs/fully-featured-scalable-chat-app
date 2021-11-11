import * as dotenv from "dotenv";
dotenv.config();

const requiredConfigKeys = [
  "COSMOS_ENDPOINT",
  "COSMOS_KEY",
  "COSMOS_DATABASE_ID",
  "JWT_SIGNING_KEY",
  "ABLY_API_KEY",
];

for (let requiredSetting of requiredConfigKeys) {
  if (process.env[requiredSetting] === undefined) {
    throw new Error(
      `Missing required setting: ${requiredSetting}. Have you added your .env file to /api?`
    );
  }
}
