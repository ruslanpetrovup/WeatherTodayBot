const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// const OpenAI = require("openai");
require("dotenv").config();
// const openai = new OpenAI(process.env.TOKEN_API);
const TelegramBot = require("node-telegram-bot-api");
const token = "853161826:AAGXKhWdrHVexfWj_Gmlgp40wOtoh8SaGMc";
console.log(process.env.TOKEN_API);

const bot = new TelegramBot(token, {
  polling: { autoStart: true, params: { allowed_updates: true } },
});

app.use(cors());
app.use(bodyParser.json());

bot.on("message", async (msg) => {
  if (msg.text === "/start") {
    bot.sendMessage(msg.chat.id, "Напиши мне что-то");
    return;
  }
});

// app.use("/", async (req, res) => {
//   const { text } = req.body;
//   const gptResponse = await openai.complete({
//     engine: "davinci",
//     prompt: text,
//     maxTokens: 600,
//     temperature: 0.5,
//     topP: 0.9,
//     presencePenalty: 0,
//     frequencyPenalty: 0,
//     bestOf: 3,
//     n: 1,
//     model: "text-davinci-002",
//     stream: false,
//     stop: text.split(" ")[0],
//   });

//   console.log(text.split(" ")[0]);

//   res.send(gptResponse.data.choices[0].text);
// });

app.listen(8000, () => {
  console.log("server start");
});
