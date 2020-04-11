const { GraphQLServerLambda } = require('graphql-yoga')
var fs = require('fs')
const { getUser } = require('./resolver/Common/postgresql')
const { createUser } = require('./resolver/Mutation/postgresql_createUser')

const typeDefs = fs.readFileSync('./schema.gql').toString('utf-8')

const resolvers = {
  Query: {
    postgresql_getUser: getUser,
    aurora_getUser: getUser,
  },
  Mutation: {
    postgresql_createUser: createUser,
    aurora_createUser: createUser,
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler
