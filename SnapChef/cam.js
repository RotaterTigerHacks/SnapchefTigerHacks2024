async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();
}

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({video: true})
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440
    },
    //facingMode: {
      //exact: 'environment'
    //}
  }
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("");
ctx.drawImage(img, 10, 10);
