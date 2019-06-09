var vgaButton = document.querySelector("button#vga");
var qvgaButton = document.querySelector("button#qvga");
var video = document.querySelector("video");
var stream;
navigator.getUserMedia = navigator.getUserMedia ||navigator.webkitGetUserMedia || navigator.mediaDevices.getUserMedia;
function successCallback(gotStream) {
window.stream = gotStream;
video.srcObject = stream;
video.play();
}
function errorCallback(error){
console.log("navigator.getUserMedia error: ", error);
}
var qvgaConstraints = {
video: {
mandatory: {
maxWidth: 320,
maxHeight: 240
}
}
};
var vgaConstraints = {
video: {
mandatory: {
maxWidth: 640,
maxHeight: 480
}
}
};
qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vgaButton.onclick = function(){getMedia(vgaConstraints)};
function getMedia(constraints){
    if (!!stream) {
        video.src = null;
        stream.stop();
        }
        navigator.getUserMedia(constraints, successCallback, errorCallback);
        }