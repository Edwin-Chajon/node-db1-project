const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

const router = require('./Router/router');

server.use(express.json());

server.use('/accounts', router);

module.exports = server;