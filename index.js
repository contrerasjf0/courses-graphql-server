'use strict'

require('dotenv').config()

const express = require('express')

const { makeExecutableSchema } = require('graphql-tools')
const gqlMiddleware = require('express-graphql')
const cors = require('cors')
const { readFileSync } = require('fs')
const { join } = require('path')

const resolvers = require('./lib/graphql/resolvers')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

// Define the schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'graphql', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev // Work in development mode
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
})
