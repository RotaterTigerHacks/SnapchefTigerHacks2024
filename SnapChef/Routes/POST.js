app.post('/upload', async (req, res) => {
    try {
        // Extract the base64 image from the request
        const base64Data = req.body.image.replace(/^data:image\/png;base64,/, "");
        const imagePath = path.join(__dirname, 'uploads', 'captured_image.png');

        // Save the base64 image as a file
        fs.writeFileSync(imagePath, base64Data, 'base64');

        // Use a placeholder function to simulate image recognition
        const detectedItem = await detectImage(imagePath);  // e.g., "apple"

        // Generate recipes using OpenAI API
        const recipes = await generateRecipes(detectedItem);

        // Send the generated recipes back to the client
        res.json({ recipes });
    } catch (error) {
        console.error("Error processing the image:", error);
        res.status(500).send("Error processing the image");
    }
});
