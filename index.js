'use strict'

const express = require('express')

const { makeExecutableSchema } = require('graphql-tools')
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')

const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// Define the schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true // Work in development mode
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
})
