// MIDI over WS proto-jambon :)
//https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

"use strict";

process.title = 'node-midiws';// Optional. You will see this name in eg. 'ps' or 'top' command

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
var webSocketServer = require('websocket').server;// websocket and http servers
var http = require('http');

/**
 * Global variables
 */

// latest 100 messages
//var history=[];

// list of currently connected clients (users)
var clients=[];


/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
  // Not important for us. We're writing WebSocket server,
  // not HTTP server
});

server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket
    // request is just an enhanced HTTP request. For more info 
    // http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

function rnd(n){
    return Math.round(Math.random()*n);
}

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    // accept connection - you should check 'request.origin' to
    // make sure that client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin); 
    
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    var userName = 'User#'+clients.length;
    //var userColor = false;
    
    console.log((new Date()) + ' Connection accepted.');
    
    // send back chat history
    //if (history.length > 0) {
    //    connection.sendUTF(JSON.stringify({ type: 'history', data: history} ));
    //}

    // user sent some message
    connection.on('message', function(message) {
        
        if (message.type === 'utf8') { // accept only text
           
            // log and broadcast the message
            
        } else{
            
            console.warn('message type is', message.type);
            
            let bin=message.binaryData;
            if(bin.length==3){
                console.log(bin[0],bin[1],bin[2]);    
            }else if(bin.length==2){
                console.log(bin[0],bin[1]);    
            }else{
                console.log(message.binaryData);
            }
            
            for(let i in clients){
                if(i==index)continue;//do not send to sender
                clients[i].send(message.binaryData);
            }
        }
    });

    // user disconnected
    connection.on('close', function(connection) {

        if (userName !== false) {

            console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
            // remove user from the list of connected clients
            clients.splice(index, 1);

        }
    });
});