import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, body } = req;
  const startTime = Date.now();

  // Ignore logging for IntrospectionQuery
  if (body?.operationName === "IntrospectionQuery") {
    return next();
  }

  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    const logMessage = `${method} ${url} ${res.statusCode} - ${responseTime}ms`;

    if (res.statusCode >= 500) {
      logger.error(logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  logger.http(`[Request] ${method} ${url} - ${JSON.stringify(body)}`);
  next();
};

export default loggerMiddleware;
