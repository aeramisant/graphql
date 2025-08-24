const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers/resolvers');
const { db } = require('./data/productsData');

const context = {
  db,
};

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen(4000).then((data) => {
  console.log('App is running on port......', data.url);
});
