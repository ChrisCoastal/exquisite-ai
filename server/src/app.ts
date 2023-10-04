// npm install @apollo/server express graphql cors body-parser
// import { buildSchema } from 'graphql';
import fs from 'fs';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import { createHandler } from 'graphql-http/lib/use/express';
// import { schema } from './previous-step';
// import { dirname } from 'path';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolvers } from 'src/graphql';

interface MyContext {
  token?: string;
}

// Required logic for integrating with Express
const app = express();
export const httpServer = http.createServer(app);

// read from schema.graphql (alternatively can write in schema.ts)
const typeDefs = fs.readFileSync(`src/graphql/schema.graphql`, 'utf8');
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // better server shutdown
});
// Ensure we wait for our Apollo server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

// Modified server startup
app.get('/', (req, res) => {
  res.send('Hello world!');
});
// await new Promise<void>((resolve) =>
//   httpServer.listen({ port: 4000 }, resolve)
// );
// console.log(`🚀 Server ready at http://localhost:4000/`);

// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };

// const app = express();
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
//   })
// );

// export default app;
