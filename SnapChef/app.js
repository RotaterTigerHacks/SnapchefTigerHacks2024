// server.js (Backend)
const express = require('express');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));  // To handle large image data

// OpenAI API configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,  // Load your OpenAI API key from .env file
});
const openai = new OpenAIApi(configuration);

// POST route for handling image upload from frontend
app.post('/upload', async (req, res) => {
    try {
        const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        const imagePath = './uploads/captured_image.png';

        // Save base64 image as file
        fs.writeFileSync(imagePath, base64Data, 'base64');

        // Call DALL·E to analyze the image and detect the item
        const detectedItem = await recognizeImageWithDalle(imagePath);

        // Generate a recipe using ChatGPT based on the detected item
        const recipes = await generateRecipesFromChatGPT(detectedItem);

        // Send the generated recipes back to the frontend
        res.json({ recipes });
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).send("Error processing image");
    }
});

// Helper function to recognize the object in the image using DALL·E
async function recognizeImageWithDalle(imagePath) {
    const imageData = fs.readFileSync(imagePath, 'base64');
    const response = await openai.createImage({
        prompt: "Analyze this image and tell me what it contains.",
        image: `data:image/png;base64,${imageData}`,
    });
    return response.data.choices[0].text;  // Return detected object (e.g., 'apple')
}

// Helper function to generate recipes with ChatGPT
async function generateRecipesFromChatGPT(item) {
    const response = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            { role: "user", content: `Give me a recipe that uses ${item}.` }
        ]
    });
    return response.data.choices[0].message.content;  // Return recipe text
}

// Start the server
app.listen(3000, () => {
    console.log('Backend running on http://localhost:3000');
});
