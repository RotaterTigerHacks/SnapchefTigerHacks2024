(() => {
    const width = window.innerWidth / 2;
    let height = 0;
    let streaming = false;
    let show_picture = false;

    const video = document.getElementById('cam_video');
    const canvas = document.getElementById('cam_canvas');
    const startbutton = document.getElementById('camera_button');
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .catch((err) => {
            console.error("An error occurred: " + err);
        });

    video.addEventListener('canplay', (ev) => {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', (ev) => {
        takePicture();
        ev.preventDefault();
    }, false);

    function takePicture() {
        const context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            const data = canvas.toDataURL('image/png');
            sendImageToServer(data); // Send the image data to the backend
        }
    }

    // Function to send image to the backend
    function sendImageToServer(imageData) {
        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: imageData })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data.recipes); // Handle recipe results here
            alert("Recipes: " + data.recipes);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
})();
