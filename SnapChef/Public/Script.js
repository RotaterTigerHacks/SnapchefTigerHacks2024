document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];
  
  if (!imageFile) {
      alert("Please select an image to upload.");
      return;
  }

  formData.append('image', imageFile);

  try {
      const response = await fetch('/upload', {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          throw new Error('Failed to upload image. Please try again.');
      }

      const data = await response.json();
      document.getElementById('recipeOutput').innerText = data.recipes;
  } catch (error) {
      console.error("Error:", error);
      document.getElementById('recipeOutput').innerText = "An error occurred: " + error.message;
  }
});
