const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate-reply", async (req, res) => {
  const { message } = req.body;

  try {
    const prompt = `You are RepliAgent, an AI assistant helping realtors reply to leads in a smart, polite, and persuasive way.\n\nUser message: "${message}"\n\nReply:`;
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`RepliAgent server running on port ${PORT}`);
});
add index.js for main API logic
