window.onload=inicio;
var vid;
function inicio(){
    vid=document.querySelector("video")
    //document.querySelector(".play").onclick=play; 
}
function play(){
    vid.src="mongolo.mp4"
    vid.play();
}

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-menu_visible");

  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar menú");
  } else {
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
});