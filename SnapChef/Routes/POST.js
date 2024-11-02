const express = require('express');
const fs = require('fs');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');

const router = express.Router();

// OpenAI API Configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Function to generate recipes using OpenAI API
async function generateRecipes(detectedItem) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Generate a recipe using ${detectedItem}.`,
        max_tokens: 150,
    });
    
    return response.data.choices[0].text.trim();
}

// Endpoint for uploading images
router.post('/upload', async (req, res) => {
    // Implement your image upload logic here
    // This is where you handle the image processing and recipe generation
    res.send("Image upload logic goes here");
});

module.exports = router;
