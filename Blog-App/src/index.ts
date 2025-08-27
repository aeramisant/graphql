import { ApolloServer } from 'apollo-server';
import { PrismaClient } from './generated/prisma';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';

export interface Context {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

const context: Context = {
  prisma,
};

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen(4000).then(({ url }: { url: string }) => {
  console.log('App is running on port......', url);
});
