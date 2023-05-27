const express = require('express');
const bodyParser = require('body-parser');
const { Configuration , OpenAIApi } = require('openai');
const cors = require('cors');

const port = process.env.PORT || 5000;

const config = new Configuration({
    organization: "org-0wBMtfVBserw5Vx2RBTgrPPc",
    apiKey: "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"
})
const app = express();  

const openai = new OpenAIApi(config)

app.use(bodyParser.json());
app.use(cors());

app.post('/chat',async (req, res) => {
    try {
        const { prompt } = req.body;
        const data = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages:[{role:"user", content:"hello"}]
        });
        console.log(data.data.choices[0].message)
        res.send({data: data.data.choices[0].message })
    } catch (error) {
        console.log(error,'asdasdasd')
        res.send({error: error})
    }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});