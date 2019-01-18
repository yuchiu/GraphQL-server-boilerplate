import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema, formatArgumentValidationError } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import session from "express-session";

import "./config/secrets";
import sessionConfig from "./config/sessionConfig";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { CurrentUserResolver } from "./modules/user/CurrentUser";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      CurrentUserResolver,
      ConfirmUserResolver
    ]
  });

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  app.use(
    cors({
      credentials: true,
      origin: "https://localhost:3000"
    })
  );
  app.use(session(sessionConfig));

  apolloServer.applyMiddleware({ app });

  app.listen(3030, () => {
    console.log("  server is listening on port: " + 3030 + "/graphql");
  });
};

main();
