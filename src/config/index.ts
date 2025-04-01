import dotenv from "dotenv";
import path from "path";

// Set the environment (default to 'production' if not specified)
const env = process.env.NODE_ENV || "production";

// Load environment variables from the corresponding `.env` file
dotenv.config({
    path: path.resolve(__dirname, `../../.env.${env}`),
});

// Load default `.env` as fallback
dotenv.config();

// Define configuration interface
interface Config {
    gateway: string;
    origins: string[];
    serverPort: number;
    serverHost: string;
    redisHost: string;
    redisPort: number;
    redisPassword: string;
    redisTokenKey: string;
    expiresIn: string;
}

// Application configuration
const config: Config = {
    gateway: process.env.GATEWAY_URL || "http://127.0.0.1:8000",
    origins: (process.env.ORIGINS || "http://localhost:3000").split(","),
    serverPort: Number(process.env.SERVER_PORT) || 5000,
    serverHost: process.env.SERVER_HOST || "127.0.0.1",
    redisHost: process.env.REDIS_HOST || "127.0.0.1",
    redisPort: Number(process.env.REDIS_PORT) || 6379,
    redisPassword: process.env.REDIS_PASSWORD || "",
    redisTokenKey: process.env.REDIS_TOKEN_KEY || "auth_token",
    expiresIn: process.env.EXPIRES_IN || "1h",
};

// Export the configuration
export default config;
