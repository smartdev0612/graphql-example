const path = require('path')
const express = require('express')
const { buildSchema } = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutalbeSchema } = require('@graphql-tools/schema')

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
})

const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'))

const schema = makeExecutalbeSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
})

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.listen(3000, () => {
  console.log('Running GraphQL server...')
})
