const { GraphQLServerLambda } = require("graphql-yoga");
var fs = require("fs")

const typeDefs = fs.readFileSync("./schema.gql").toString('utf-8');

const resolvers = {
    Query: {
        postgresql_getUser: require("./resolver/Query/postgresql_getUser").func,
        aurora_getUser: require("./resolver/Query/aurora_getUser").func
    },
    Mutation: {
        postgresql_createUser: require("./resolver/Mutation/postgresql_createUser").func,
        aurora_createUser: require("./resolver/Mutation/aurora_createUser").func
    }
};

const lambda = new GraphQLServerLambda({
    typeDefs,
    resolvers
});

exports.server = lambda.graphqlHandler;
exports.playground = lambda.playgroundHandler;
