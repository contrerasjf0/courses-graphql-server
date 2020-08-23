'use strict'

const connectDb = require('./db')
const errorHandler = require('../errorHandler')
const { ObjectID } = require('mongodb')

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db
      let peopleData = []
      let ids

      try {
        db = await connectDb()
        ids = people ? people.map(id => ObjectID(id)) : []

        if (ids.length) {
          peopleData = await db.collection('students').find(
            { _id: { $in: ids } }
          ).toArray()
        }
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  }
}
