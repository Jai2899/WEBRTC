navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia|| navigator.mediaDevices.getUserMedia;
var constraints = {audio: false, video: true};
var video = document.querySelector("video");
function successCallback(stream) {
window.stream = stream;
video.srcObject = stream;
video.play();
}
function errorCallback(error){
console.log("navigator.getUserMedia error: ", error);
}
navigator.getUserMedia(constraints, successCallback, errorCallback);