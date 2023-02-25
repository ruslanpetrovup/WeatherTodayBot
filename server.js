const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const OpenAI = require('openai-api');
const openai = new OpenAI("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");

app.use(cors());
app.use(bodyParser.json());



app.use('/',(req,res)=> {
  (async () => {
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: 'Придумай название для моего кафе',
        maxTokens: 100,
        temperature: 0.1,
        topP: 0.5,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: [ "Придумай"]
    });

    console.log(gptResponse.data);
    res.send(gptResponse.data)
})();

})

app.listen(3000, () => {
  console.log("server start");
});
