import axios from "axios";

const generateContent = async (prompt,assistantName,userName) => {
  try {
    const assistantPrompt = `
    You are ${assistantName}, an AI assistant designed to help ${userName} with their queries.
    Your task is to understant user's natural language input and provide JSON object like this:
    {
      "type": "Your response here",
      "suggestions": ["Suggestion 1", "Suggestion 2"]
    }`

















    const response = await axios.post(process.env.GOOGLE_API_KEY, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error(
      "Error generating content:",
      error.response?.data || error.message
    );
    return null;
  }
};

export default generateContent;
