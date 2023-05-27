const express = require('express');
const bodyParser = require('body-parser');
const { Configuration , OpenAIApi } = require('openai');
const cors = require('cors');
require('dotenv').config()

const port = process.env.PORT || 5000;

const config = new Configuration({
    organization: process.env.ORG_ID,
    apiKey: process.env.API_KEY,
})
const app = express();  

const openai = new OpenAIApi(config)

app.use(bodyParser.json());
app.use(cors());
app.post('/chat',async (req, res) => {
    try {
        console.log(process.env.PORT,'asdasdasdasdasd')
        const { prompt } = req.body;
        const data = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[{role:"user", content:"hello"}]
        });
        console.log(data.data.choices[0].message)
        res.send({data: data.data.choices[0].message })
    } catch (error) {
        res.send({error: error})
    }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});