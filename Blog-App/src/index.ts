import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers/resolvers';

const context = {
  //   db,
};

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen(4000).then(({ url }: { url: string }) => {
  console.log('App is running on port......', url);
});
