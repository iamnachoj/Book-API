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

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV || 'production',
  mongDbUri: process.env.CONNECTION_URI
};