const express = require('express');

const server = express();

const router = require('./Router/router');

server.use(express.json());

server.use('/accounts', router);

server.get("/", (req, res) => {res.send('this is a thing :p')});

module.exports = server;