#!/usr/local/bin/node
var arDrone = require('ar-drone');
var droneIp = process.env.DEFAULT_DRONE_IP || "192.168.1.1";
console.log(droneIp)
var client  = arDrone.createClient({ip: droneIp});
client.createRepl();

