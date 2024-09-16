// require("dotenv").config();

const express = require("express");
const app = express();
const port = 4000;

// adding body-parser and cors
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

function processQuery(query) {
  if (query.toLowerCase().includes("i want")) {
    return " Hi, it's great to connect with you! To start off, could you tell me a bit about Millet Amma and what sets your brand apart from others in the market?.";
  } else if (query.toLowerCase().includes("promotion strategy")) {
    return "Based on our analysis, we recommend implementing a multi-channel approach combining digital marketing, influencer partnerships, in-store activations, and targeted advertising to maximize reach and engagement. We will focus on storytelling to highlight Millet Amma's unique value proposition and create compelling content that resonates with the target audience. Additionally, leveraging data analytics and consumer insights will allow us to optimize campaigns for better results.";
  } else if (query.toLowerCase().includes("target audience")) {
    return "Our target audience in central India consists of health-conscious individuals who seek alternatives to traditional, processed foods. They value authenticity, quality, and the health benefits of natural ingredients. Convenience is also important to them, as they lead busy lifestyles.";
  } else if (query.toLowerCase().includes("preferred marketing channels")) {
    return "We've found success with a combination of digital and traditional marketing channels. Online platforms such as social media, food blogs, and e-commerce websites have helped us reach a wider audience. Additionally, local events, partnerships with health organizations, and in-store promotions have been effective in driving brand awareness and engagement.";
  } else {
    return "I'm sorry, I couldn't understand your query. Please provide more details.";
  }
}

// Endpoint to receive queries from the web interface
app.post('/', (req, res) => {
  const { message } = req.body;

  // Process the query
  const response = processQuery(message);

  res.json({ botResponse: response });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
