const express = require('express');
const bodyParser = require('body-parser');
const { AutoModelForCausalLM, AutoTokenizer } = require("transformers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

async function loadModel() {
  try {
    const tokenizer = await AutoTokenizer.fromPretrained("mosaicml/mpt-7b-chat");
    const model = await AutoModelForCausalLM.fromPretrained("mosaicml/mpt-7b-chat");
    return { tokenizer, model };
  } catch (error) {
    console.error("Error loading model:", error);
    throw error;
  }
}

async function generateResponse(tokenizer, model, inputText) {
  try {
    const encodedInput = await tokenizer.encode(inputText, { return_tensors: "pt" });
    const output = await model.generate(encodedInput);
    const generatedResponse = tokenizer.decode(output[0]);
    return generatedResponse;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

let modelPromise = loadModel();

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const { tokenizer, model } = await modelPromise;
    const botResponse = await generateResponse(tokenizer, model, message);
    res.json({ botResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  modelPromise = loadModel(); // Reload the model when the server starts
});
