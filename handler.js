const { GraphQLServerLambda } = require('graphql-yoga')
var fs = require('fs')
const { postgresqlGetUser } = require('./resolver/Query/postgresql_getUser')
const { auroraGetUser } = require('./resolver/Query/aurora_getUser')
const { postgresqlCreateUser } = require('./resolver/Mutation/postgresql_createUser')
const { auroraCreateUser } = require('./resolver/Mutation/aurora_createUser')

const typeDefs = fs.readFileSync('./schema.gql').toString('utf-8')

const resolvers = {
  Query: {
    postgresql_getUser: postgresqlGetUser,
    aurora_getUser: auroraGetUser,
  },
  Mutation: {
    postgresql_createUser: postgresqlCreateUser,
    aurora_createUser: auroraCreateUser,
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

exports.server = lambda.graphqlHandler
exports.playground = lambda.playgroundHandler
