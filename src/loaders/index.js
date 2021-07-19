const expressLoader = require('./express');
const {connectMongoWithRetry} = require('./database');

const appInitLoader = async (app) => {
  await connectMongoWithRetry()
  expressLoader(app);
};

module.exports = {appInitLoader}