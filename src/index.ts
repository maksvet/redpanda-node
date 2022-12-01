import * as readline from "node:readline"
import * as Admin from "./admin"
import * as Producer from "./producer"
import * as Consumer from "./consumer"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function start() {
  const topic = "chat-room"
  console.log(`Creating topic: ${topic}`)
  Admin.createTopic(topic).then(() => {
    console.log("Connecting...")
    Consumer.connect().then(() => {
      rl.question("Enter user name: \n", function (username) {
        Producer.getConnection(username).then((sendMessage) => {
          console.log("Connected, press Ctrl+C to exit")
          rl.on("line", (input) => {
            readline.moveCursor(process.stdout, 0, -1)
            sendMessage(input);
          })
        })
      })
    })
  })  
}
start()

process.on("SIGINT", process.exit)
process.on("exit", () => {
  Producer.disconnect();
  Consumer.disconnect();
  rl.close();
})