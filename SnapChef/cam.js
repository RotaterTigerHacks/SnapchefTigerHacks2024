(() => {
    const width = 320; // We will scale the photo width to this
    let height = 0;    // This will be computed based on the input stream
    let streaming = false;

    const video = document.getElementById('cam_video');
    const canvas = document.getElementById('cam_canvas');
    const startbutton = document.getElementById('startbutton');

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
        } else {
            clearPhoto();
        }
    }

    function clearPhoto() {
        const context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL('image/png');
    }
})();
