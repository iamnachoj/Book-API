const path = require('path')
const dotenv = require('dotenv');

const envPath = path.join(
  process.cwd(),
  `.env${!process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : `.${process.env.NODE_ENV}`}`,
);

const loadenv = () =>
  dotenv.config({
    path: envPath,
  });

loadenv();

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV || 'production',
  mongDbUri: process.env.CONNECTION_URI,
  mongo: {
    uri: process.env.CONNECTION_URI,

    options: {
      useCreateIndex: true,
      useUnifiedTopology: true,
      keepAlive: 1,
      // reconnectTries: 3600, // Never stop trying to reconnect
      // reconnectInterval: 500, // Reconnect every 500ms
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    },
  },
};

module.exports = config