import {Kafka} from "kafkajs"

const redpanda = new Kafka({
  brokers: ["localhost:9092"]
})
const admin = redpanda.admin()

export function createTopic(topic: string, partitions?: number, replicas?: number) {
  return admin.connect().then(() => {
    admin.createTopics({
      topics: [{
        topic: topic,
        numPartitions: partitions ? partitions : 1,
        replicationFactor: replicas ? replicas : 1,
      }]
    }).then(() => admin.disconnect())
  })
}