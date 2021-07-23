const mongoose = require('mongoose');
const config = require('../config/');

// make bluebird default Promise
mongoose.Promise = require('bluebird')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

if (config.env === 'development') {
  mongoose.set('debug', true)
}

exports.connectMongoWithRetry = async () => {
  const connectionString = config.mongo.uri
  const connectionOptions = config.mongo.options
  try {
    await mongoose.connect(connectionString, connectionOptions)
    console.log(' 💻 Mongoose successfully connected to Movie database: ')
    return mongoose.connection
  } catch (error) {
    if (error.message.code === 'ETIMEDOUT') {
      console.log('Attempting to re-establish database connection.')
      mongoose.connect(connectionString, connectionOptions)
    } else {
      console.error('Error while attempting to connect to database', error);
    }
  }
}