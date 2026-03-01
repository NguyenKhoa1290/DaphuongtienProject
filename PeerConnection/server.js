const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const socketio = require('socket.io');
app.use(express.static(__dirname));
const key = fs.readFileSync('create-ca.key');
const cert = fs.readFileSync('create-ca.crt');
//Doi de may chu ho tro https
const expressServer = https.createServer({key,cert},app);
const io = socketio(expressServer);
expressServer.listen(5069);
io.on('connection', socket =>{
    console.log('New client connected: ');
})