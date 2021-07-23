const express = require('express');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');

const initVendorMiddlewares = (app) => {
  app.use(cors(),);
  app.use(morgan("common"));
  app.use(bodyParser.json({ limit: '300kb' }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: '300kb',
    }),
  );
  app.use(express.static("public"));
};

module.exports = {initVendorMiddlewares}