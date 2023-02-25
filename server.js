const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const OpenAI = require("openai-api");
const openai = new OpenAI(
  "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"
);
const TelegramBot = require("node-telegram-bot-api");
const token = "853161826:AAGXKhWdrHVexfWj_Gmlgp40wOtoh8SaGMc";

const bot = new TelegramBot(token, {
  polling: { autoStart: true, params: { allowed_updates: true } },
});

app.use(cors());
app.use(bodyParser.json());

bot.on("message", async (msg) => {
  const gptResponse = await openai.complete({
    engine: "davinci",
    prompt: msg.text,
    maxTokens: 100,
    temperature: 0.1,
    topP: 0.5,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: [msg.text.split(" ")[0]],
  });

  bot.sendMessage(msg.chat.id, gptResponse.data.choices[0].text);
});

app.use("/", (req, res) => {
  (async () => {
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: "Придумай название для моего кафе",
      maxTokens: 100,
      temperature: 0.1,
      topP: 0.5,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["Придумай"],
    });

    console.log(gptResponse.data);
    res.send(gptResponse.data);
  })();
});

app.listen(8000, () => {
  console.log("server start");
});
