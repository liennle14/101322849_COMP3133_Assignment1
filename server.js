const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const mongoose = require('mongoose');

const { ApolloServer } = require('apollo-server-express');

mongoose.connect("mongodb+srv://dbuser:VNGcdYVMGXdLQz0a@cluster0.wihv2ix.mongodb.net/comp3133?retryWrites=true&w=majority", {
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

const app = express();
const server = new ApolloServer({ 
    typeDefs,
    resolvers 
});
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer();
app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);