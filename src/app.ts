import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { NewResolver } from "./resolvers/new/new.resolver";
import {
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { Container } from "typeorm-typedi-extensions";


export async function startServer() {
  const app = express();
  
  const server = new ApolloServer({
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    schema: await buildSchema({
      resolvers: [NewResolver],
      emitSchemaFile: true,
      container: Container,

    }),
    context: ({ req, res }) => ({ req, res }),
  });


  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}
