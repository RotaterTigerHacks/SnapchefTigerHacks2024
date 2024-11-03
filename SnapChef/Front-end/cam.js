(() => {
    const width = window.innerWidth/2; // We will scale the photo width to this
    let height = 0;    // This will be computed based on the input stream
    let streaming = false;
    var show_picture = false;

    var video = document.createElement("video");
    var image = document.createElement("image");
    var donebutton = document.getElementById("done_button");
    const canvas = document.getElementById('cam_canvas');
    var startbutton = document.getElementById('camera_button');
    const link = document.getElementById("im_link");

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

    donebutton.addEventListener('click', (ev) => {
        window.location.assign(link.href);
        ev.preventDefault();
    }, false);
    

    function takePicture() {
        const context = canvas.getContext('2d');
        show_picture = !show_picture;
        if (width && height && show_picture) {
	    startbutton.src="Images/retry.png";
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
	    done_button.innerText = 'Click Me';
	    document.body.appendChild(done_button);

            const data = canvas.toDataURL('image/png');
	    image.setAttribute('src', data);
	    link.href = "design.html?image=" + encodeURIComponent(data);
        } else {
	    startbutton.src="Images/camera_icon.png";
            clearPhoto();
        }
    }

    function clearPhoto() {
        const context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const data = canvas.toDataURL('image/png');
	image.setAttribute('src', data);
    }
})();
