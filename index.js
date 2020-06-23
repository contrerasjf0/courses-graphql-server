'use strict'

const { graphql, buildSchema } = require('graphql')

// Define the schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`)

// Run the hello query 
graphql(schema, '{ hello }').then((data) => {
  console.log(data)
})
