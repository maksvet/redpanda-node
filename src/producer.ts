import {Kafka} from "kafkajs"

const redpanda = new Kafka({
  brokers: ["localhost:9092"]
})
const producer = redpanda.producer()

export function getConnection(user: string) {
  return producer.connect().then(() => {
    return (message: string) => {
      return producer.send({
        topic: "chat-room",
        messages: [{value: JSON.stringify({message, user})},],
      })
    }
  })
}

export function disconnect() {
  return producer.disconnect()
}