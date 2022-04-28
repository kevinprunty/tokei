const dotenv = require('dotenv');
dotenv.config();

async function queryModel(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/hakurei/c1-6B",
		{
			headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_TOKEN}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
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
