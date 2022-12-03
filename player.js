window.onload=inicio;
var vid;
function inicio(){
    vid=document.querySelector("video")
    document.querySelector(".play").onclick=play; 
}
function play(){
    vid.src="mongolo.mp4"
    vid.play();
}