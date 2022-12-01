import {Kafka} from "kafkajs"
import {v4 as uuidv4} from "uuid"

const redpanda = new Kafka({
  brokers: ["localhost:9092"]
})
const consumer = redpanda.consumer({groupId: uuidv4()})

export function connect() {
  return consumer.connect().then(() =>
    consumer.subscribe({topic: "chat-room"}).then(() =>
      consumer.run({
        eachMessage: async ({topic, partition, message}) => {
          const formattedValue = JSON.parse((message.value as Buffer).toString())
          console.log(`${formattedValue.user}: ${formattedValue.message}`)
        },
      })
    )
  )
}

export function disconnect() {
  consumer.disconnect()
}
