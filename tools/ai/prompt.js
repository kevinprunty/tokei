const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv');
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
    getResponse: async (prompt) => {
        const completion = await openai.createCompletion("text-davinci-002", {
          prompt: prompt,
          temperature: 0.9,
          max_tokens: 350
        });
        return completion.data.choices[0].text;
      }
} 
