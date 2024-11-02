document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
  
    const formData = new FormData();
    const imageFile = document.getElementById('imageUpload').files[0];
    formData.append('image', imageFile);
  
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });
  
    const data = await response.json();
    document.getElementById('recipeOutput').innerText = data.recipes;
  });
  