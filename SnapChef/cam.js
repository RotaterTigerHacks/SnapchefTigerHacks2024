(() => {
    const width = 320; // We will scale the photo width to this
    let height = 0;    // This will be computed based on the input stream
    let streaming = false;
    var show_picture = false;

    var video = document.createElement("video");
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
        	var context = canvas.getContext('2d');
            height = video.videoHeight / (video.videoWidth / width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
            (function loop() {
              if (!show_picture)
              {
				context.drawImage(video, 0, 0, width, height);
              	setTimeout(loop, 1000 / 30); // drawing at 30fps
              }
              else
              	setTimeout(loop, 1000 / 30);
            })()
        }
    }, false);

    startbutton.addEventListener('click', (ev) => {
        takePicture();
        ev.preventDefault();
    }, false);

    function takePicture() {
        const context = canvas.getContext('2d');
        show_picture = !show_picture;
        if (width && height && show_picture) {
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
