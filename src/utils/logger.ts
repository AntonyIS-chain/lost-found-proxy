import winston from "winston";

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: "info", // Log level (info, warn, error, etc.)
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSS[Z]" }),
    winston.format.json(), // Logs in JSON format
    winston.format.simple(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: "server.log" }) // Logs to file
  ]
});

export default logger;
