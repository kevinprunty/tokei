const dotenv = require('dotenv');
const axios = require('axios').default;
dotenv.config();

async function queryModel(data) {
	const response = await axios(
		{ 
      url : "https://api-inference.huggingface.co/models/hakurei/c1-6B",
			headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
			method: "POST",
			data: JSON.stringify(data),
		}
	);
	const result = await response.data;
	return result;
}



module.exports = {
    getResponse: async (query) => {

      const compositeQuery = `${query}`

      const rawResponse = await queryModel({"inputs": {
        "past_user_inputs": [],
        "generated_responses": [],
        "text": compositeQuery
      }});
      console.log(rawResponse);
      return "CURRENTLY DEBUGGING- CHECK LOGS";
    }
} 
