'use strict'

const express = require('express')
const { buildSchema } = require('graphql')
const gqlMiddleware = require('express-graphql')

const app = express()
const port = process.env.port || 3000

//Define the schema
const schema = buildSchema(`
  type Query {
    "Retorna un saludo al mundo"
    hello: String
  }
`)

// Configure the resolvers
const resolvers = {
  hello: () => {
    return 'Hola Mundo'
  }
}

app.use('/api', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true //Work in development mode
}))

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}/api`);
})
