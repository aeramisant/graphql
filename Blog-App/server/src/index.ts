import { ApolloServer } from 'apollo-server';
import { PrismaClient } from './generated/prisma';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';
import { getUserFromToken } from './utils/utils';

export interface Context {
  prisma: PrismaClient;
  userInfo: { userId: number | null } | undefined;
}

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }): Context => {
    const auth = req.headers.authorization as string;
    const userInfo = getUserFromToken(auth);
    return { prisma, userInfo };
  },
});

server.listen(4000).then(({ url }: { url: string }) => {
  console.log('App is running on port......', url);
});
