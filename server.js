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

bot.setMyCommands([{ command: '/weather', description: 'Узнать погоду в своем городе' }]);
bot.on('message', async (msg) => {
  if (msg.text === '/weather') {
    const chatId = msg.chat.id;
    bot.onText(/\/weather/, async (msg) => {
      return await bot.sendMessage(chatId, 'Напиши названия нужного города').then(() => {
        return bot.onText(/^(.+)$/, async function listenInput(msg, match) {
          try {
            const locationResponse = await axios.get(
              `https://api.weatherbit.io/v2.0/current?city=${match.input}&key=${process.env.TOKEN_WEATHER}`
            );
            const weatherData = locationResponse.data.data[0];

            await bot.sendPhoto(
              chatId,
              `https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`
            );

            bot.sendMessage(
              chatId,
              `Текущая температура в городе ${weatherData.city_name} составляет ${weatherData.temp}°C (ощущается как ${weatherData.app_temp}°C).`
            );
            bot.removeTextListener('text', listenInput);
            bot.removeTextListener(/^(.+)$/);
            bot.removeTextListener(/\/weather/);
            return;
          } catch (err) {
            bot.sendMessage(
              chatId,
              'Произошла ошибка, попробуйте еще раз! Может вы ввели не правильно название города'
            );
            return;
          }
        });
      });
    });
    bot.downloadFile();
    return;
  }

  if (msg.text === '/start') {
    bot.sendMessage(msg.chat.id, 'Открой меню и выбери нужное действие');
    return;
  }
});

app.use('/test', (req, res) => {
  res.send('Тут пусто. Иди в бот @novos_bot');
});

app.listen(8000, () => {
  console.log('server start');
});
