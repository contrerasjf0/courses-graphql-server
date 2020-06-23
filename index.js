'use strict'

const { graphql, buildSchema } = require('graphql')

// definiendo el esquema
const schema = buildSchema(`
  type Query {
    hello: String
    greeting: String
  }
`)

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return 'Hola Mundo'
  },
  greeting: () => {
    return 'Hola a todos'
  }
}

// Run greeting query
graphql(schema, '{ greeting }', resolvers).then((data) => {
  console.log(data)
})
