const { GraphQLServerLambda } = require('graphql-yoga')
var fs = require('fs')
const { auroraGetUser, postgresGetUser, proxyGetUser } = require('./resolver/Query/getUser')
const { auroraCreateUser, postgresCreateUser, proxyCreateUser } = require('./resolver/Mutation/createUser')

const typeDefs = fs.readFileSync('./schema.gql').toString('utf-8')

const resolvers = {
  Query: {
    postgresGetUser,
    proxyGetUser,
    auroraGetUser,
  },
  Mutation: {
    postgresCreateUser,
    proxyCreateUser,
    auroraCreateUser,
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler
