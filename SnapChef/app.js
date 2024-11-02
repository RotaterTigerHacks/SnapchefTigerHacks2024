const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize Express 
const app = express();
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json
app.use(express.json()); // To ensure we can parse JSON bodies

// OpenAI API Configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Define upload directory

// Function to recognize objects in the image (placeholder)
async function recognizeObjectFromImage(imagePath) {
  // Implement image recognition logic here
  // For example, you can use Google Vision or any other image recognition API
  // For now, let's assume it returns a string
  return "apple"; // Replace this with actual recognition logic
}

// Endpoint for uploading images
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Read image from the temporary upload location
    const imagePath = req.file.path;

    // Recognize the object in the image
    const recognizedObject = await recognizeObjectFromImage(imagePath);

    // Optionally, delete the temporary image after processing
    fs.unlinkSync(imagePath); // Clean up the uploaded file

    // Generate a recipe based on the recognized object
    const recipeResponse = await openai.createCompletion({
      model: "gpt-4o",
      prompt: `Generate a recipe link using ${recognizedObject}.`,
      max_tokens: 100, // text parameter
    });
    
    const recipe = recipeResponse.data.choices[0].text.trim();

    // Send the recognized object and recipe back to the client
    res.json({
      recognizedObject,
      recipe,
    });
  } catch (error) {
    console.error('Error processing the image:', error);
    res.status(500).json({ error: 'An error occurred while processing the image.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
