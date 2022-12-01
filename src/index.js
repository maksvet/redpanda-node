"use strict";
exports.__esModule = true;
var readline = require("node:readline");
var Admin = require("./admin");
var Producer = require("./producer");
var Consumer = require("./consumer");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function start() {
    var topic = "chat-room";
    console.log("Creating topic: ".concat(topic));
    Admin.createTopic(topic).then(function () {
        console.log("Connecting...");
        Consumer.connect().then(function () {
            rl.question("Enter user name: \n", function (username) {
                Producer.getConnection(username).then(function (sendMessage) {
                    console.log("Connected, press Ctrl+C to exit");
                    rl.on("line", function (input) {
                        readline.moveCursor(process.stdout, 0, -1);
                        sendMessage(input);
                    });
                });
            });
        });
    });
}
start();
process.on("SIGINT", process.exit);
process.on("exit", function () {
    Producer.disconnect();
    Consumer.disconnect();
    rl.close();
});
