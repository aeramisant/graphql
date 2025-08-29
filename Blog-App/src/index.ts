import { ApolloServer } from 'apollo-server';
import { PrismaClient } from './generated/prisma';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';
import { getUserFromToken } from './utils/utils';

export interface Context {
  prisma: PrismaClient;
  userInfo: { userId: number | null } | undefined;
}

const prisma = new PrismaClient();

const context = async ({
  req,
}: {
  req: { headers: { authorization?: string } };
}): Promise<Context> => {
  const token = req.headers.authorization as string;
  const userInfo = await getUserFromToken(token);
  return { prisma, userInfo };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen(4000).then(({ url }: { url: string }) => {
  console.log('App is running on port......', url);
});
