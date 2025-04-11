import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import dotenv from "dotenv";
import loggerMiddleware from "../middlewares/loggerMiddleware";
import logger from "../utils/logger";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import MatchingService from "../services/MatchingService";


dotenv.config();

const startServer = async () => {
  const app = express();

  // Use the logger middleware
  app.use(loggerMiddleware);
 
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      userService: new UserService(),
      authService: new AuthService(),
      matchingService: new MatchingService(),
    }),
    context: ({ req }) => {
      const operationName = req.body?.operationName;
      

      if (operationName && operationName !== "IntrospectionQuery") {
        logger.info(`GraphQL Request: ${operationName}`);
      }

      return { req };
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

export default startServer;
