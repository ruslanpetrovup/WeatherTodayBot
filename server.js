const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

app.use(cors());
app.use(bodyParser.json());

bot.on('message', async (msg) => {
  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, 'Напиши мне свой город');
    return;
  }
  const chatId = msg.chat.id;
  const CITY_NAME = msg.text;

  console.log(process.env.TOKEN_WEATHER);

  try {
    const locationResponse = await axios.get(
      `https://api.weatherbit.io/v2.0/current?city=${CITY_NAME}&key=${process.env.TOKEN_WEATHER}`
    );
    const weatherData = locationResponse.data.data[0];

    await bot.sendPhoto(
      chatId,
      `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`
    );
    console.log(
      `Текущая температура в городе ${weatherData.city_name} составляет ${weatherData.temp}°C (ощущается как ${weatherData.app_temp}°C).`
    );

    bot.sendMessage(
      chatId,
      `Текущая температура в городе ${weatherData.city_name} составляет ${weatherData.temp}°C (ощущается как ${weatherData.app_temp}°C).`
    );
  } catch (err) {
    bot.sendMessage(
      chatId,
      'Произошла ошибка, попробуйте еще раз. Может вы ввели не правильно название города'
    );
  }
});

app.use('/', (req, res) => {
  res.send('Тут пусто. Иди в бот @novos_bot');
});

app.listen(8000, () => {
  console.log('server start');
});
