"use strict";
exports.__esModule = true;
exports.createTopic = void 0;
var kafkajs_1 = require("kafkajs");
var redpanda = new kafkajs_1.Kafka({
    brokers: ["localhost:9092"]
});
var admin = redpanda.admin();
function createTopic(topic, partitions, replicas) {
    return admin.connect().then(function () {
        admin.createTopics({
            topics: [{
                    topic: topic,
                    numPartitions: partitions ? partitions : 1,
                    replicationFactor: replicas ? replicas : 1
                }]
        }).then(function () { return admin.disconnect(); });
    });
}
exports.createTopic = createTopic;
