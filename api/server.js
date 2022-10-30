const express = require('express');
const server = express();

// imported routers
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router')

server.use(express.json())

// routes set as middleware
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

// default message
// server.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to the Express Server'
//     })
// })

module.exports = server;
