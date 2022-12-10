let jugadores = []
let nombresJugadores = []
let playersRandom = []

function readText(ruta_local) {
    var texto = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", ruta_local, false);
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        texto = xmlhttp.responseText;
    }
    return texto;
}


window.onload = function () {
    principal()
};

function principal() {
    repertorio_jugadores = readText("data/jugadores.json");
    interprete_bp = JSON.parse(repertorio_jugadores);

    jugadoresCargados = loadJugadores(interprete_bp);
    playersRandom = jugadoresRandom(jugadoresCargados);

    nombresJugadores = loadNombres(playersRandom)
    nombresDesordenados = nombresJugadores.sort(function() {return Math.random() - 0.5});
    cargaJugadoresG(playersRandom, nombresDesordenados);
}

function jugadoresRandom(jugadoresCargados) {
    playersDescolocados = jugadoresCargados.sort(function() {return Math.random() - 0.5});

    for(let i=0; i<6; i++) {
        playersRandom[i] = playersDescolocados[i];
    }

    return playersRandom;
}

let drag_elements = document.querySelector('.drag-elements');
let drop_elements = document.querySelector('.drop-elements');

//Cargamos las imagenes de los jugadores 
function cargaJugadoresG(jugadoresCargados, nombresDesordenados) {

    jugadoresCargados.forEach(jugador => {
        drag_elements.innerHTML += `
        <div class="jugador">
            <img id="${jugador.jugador}" draggable="true" class="image" src="${jugador.imagen}" alt="jugador">
        </div>
        `
    });

    nombresDesordenados.forEach(nombre => {
        drop_elements.innerHTML += `
        <div class="names">
            <p>${nombre}</p>
        </div>
        `
    });

    let players = document.querySelectorAll('.image');
    players = [...players]
    
    players.forEach(player => {
        player.addEventListener('dragstart', event=> {
            event.dataTransfer.setData('text', event.target.id)
            console.log(event)
            
        })
    })

    let names = document.querySelectorAll('.names')
    let wrongMsg = document.querySelector('.wrong')
    let points = 0;
    let vidas = 3;

    names = [...names]
        
    names.forEach(name => {
        name.addEventListener('dragover', event=>{
            event.preventDefault()
        })
        name.addEventListener('drop', event=> {
            console.log("Evento drop", event)
            const dragElementData = event.dataTransfer.getData('text');
            
            let playerElement = document.querySelector(`#${dragElementData}`);
            
            if (event.target.innerText == dragElementData) {
                points++
                event.target.innerHTML = ''
                event.target.appendChild(playerElement)
                wrongMsg.innerText = ''

                if (points == jugadoresCargados.length) {
                    swal.fire({
                        title: "Juego finalizado",
                        text: "¡GANASTE!",
                        icon: "success"
                    });
                }
            } else {
                vidas--
                wrongMsg.innerText = "Ups!. Te has equivocado"

                if (vidas == 0) {
                    swal.fire({
                        title: "Juego finalizado",
                        text: "¡HAS GASTADO TODAS TUS VIDAS!",
                        icon: "error"
                    });
                    
                    exit = setTimeout(salir, 4000)
                }
            }
        })

    })

}

function salir() {
    location.reload()
}

const btnReinicio = document.querySelector(".btnReiniciar");

btnReinicio.addEventListener("click", () => {
    location.reload()
});


function loadJugadores(a) {
   for (let i=0; i<a.length; i++) {
        jugadores[i] = a[i];
   }
   return jugadores;
}

function loadNombres(jugadores) {
    for(let i=0; i<jugadores.length; i++) {
        nombresJugadores[i] = jugadores[i].jugador;
    }
    return nombresJugadores;
}







