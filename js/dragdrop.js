const CARD = 3;
let jugadores = []
let nombresJugadores = []

function select_id(id) {
    return document.getElementById(id);
  }
  
  function style(id) {
    return select_id(id).style;
  }
  
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
    repertorio_jugadores = readText("data/jugadores.json");
    interprete_bp = JSON.parse(repertorio_jugadores);
    jugadoresCargados = loadJugadores(interprete_bp);
    nombresJugadores = loadNombres(interprete_bp)

    nombresDesordenados = nombresJugadores.sort(function() {return Math.random() - 0.5});
    cargaJugadores(jugadoresCargados, nombresDesordenados);
        
};

//Cargamos las imagenes de los jugadores 
function cargaJugadores(jugadoresCargados, nombresDesordenados) {
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

    let players = document.querySelectorAll('.image')
    players = [...players];

    players.forEach(player => {
        player.addEventListener('dragstart', event=> {
            console.log(event)
            event.dataTransfer.setData('text', event.target.id)
        })
    })

    let names = document.querySelectorAll('.names')
    let wrongMsg = document.querySelector('.wrong')
    let points = 0;

    names = [...names];
    console.log(names)
    
    names.forEach(name => {
        name.addEventListener('dragover', event=>{
            event.preventDefault()
        })
        name.addEventListener('drop', event=> {
            console.log("Evento drop", event)
            const dragElementData = event.dataTransfer.getData('text');
            
            console.log("Element", dragElementData)
            let playerElement = document.querySelector(`#${dragElementData}`);
            //Falla con algunos REVISAR
            console.log("PlayerElement",playerElement)

            if (event.target.innerText == dragElementData) {
                points++
                event.target.innerHTML = ''
                event.target.appendChild(playerElement)
                wrongMsg.innerText = ''

                if (points == 4) {
                    drag_elements.innerHTML = "Ganaste!"
                }
            } else {
                wrongMsg.innerText = "Ups!. Te has equivocado"
            }
        })

    })

}


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

let drag_elements = document.querySelector('.drag-elements');
let drop_elements = document.querySelector('.drop-elements');

function getRandomId(max) {
    return Math.floor(Math.random()*max);
}

