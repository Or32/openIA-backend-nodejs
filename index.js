const express = require('express');
const {OpenAIApi,Configuration} = require('openai');
require('dotenv').config();

// Initialize the OpenAI API client with your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/answer', async (req, res) => {
  const {question, age} = req.body;
  console.log(question)
  console.log(age)

  

  console.log(process.env.OPENAI_API_KEY)
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: `explain ${question} , to a ${age} year old`,
  max_tokens: 400,
  temperature: 1,
});
  
 
  res.send(response.data.choices[0].text);
});

app.listen(3000, () => {
  console.log('API endpoint listening on port 3000');
});

module.exports = app