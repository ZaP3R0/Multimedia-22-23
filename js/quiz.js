let preguntas_aleatorias = true;
let mostrar_pantalla_juego_términado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

let npreguntas = [];
let preguntas_hechas = 0;
let preguntas_correctas = 0;

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
  repertorio_preguntas = readText("data/preguntas.json");
  interprete_bp = JSON.parse(repertorio_preguntas);
  seleccionarPreguntaAleatoria();
};

let pregunta;
let posibles_respuestas;

btn_correspondiente = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
];

//Generamos un entero aleatorio entre el número de fotos que hay en este caso 10
function seleccionarPreguntaAleatoria() {
  let index;

  if (preguntas_aleatorias) {
        index = Math.floor(Math.random() * interprete_bp.length);
  } else {
        index = 0;
  }

  while (npreguntas.includes(index)) {
    index++;

    if (index >= interprete_bp.length) {
      index = 0;
    }

    //Para controlar cuando realizamos todas las preguntas
    //Aquí entra cuando tenemos todas las preguntas
    if (npreguntas.length == interprete_bp.length) {
      //Aquí es donde el juego se reinicia
      if (mostrar_pantalla_juego_términado) {
        swal.fire({
          title: "Juego finalizado",
          text:
            "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
          icon: "success"
          
        });
      }

      if (reiniciar_puntos_al_reiniciar_el_juego) {
        preguntas_correctas = 0
        preguntas_hechas = 0
      }
      npreguntas = [];
    }
  }
  npreguntas.push(index);
  preguntas_hechas++;

  seleccionarPregunta(index);
}

const btnReinicio = document.querySelector(".btnReiniciar");

btnReinicio.addEventListener("click", () => {
    preguntas_hechas = 0;
    preguntas_correctas = 0;
    npreguntas = []
    seleccionarPreguntaAleatoria();

});

//Una vez que tenemos la posición de la pregunta la leemos del json.
function seleccionarPregunta(n) {
  pregunta = interprete_bp[n];

  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;

  let pc = preguntas_correctas;

  if (preguntas_hechas > 1) {
    select_id("puntuacion").innerHTML = "Aciertos: "+ pc + "/" + (preguntas_hechas-1);
  } else {
    select_id("puntuacion").innerHTML = "";
  }

  style("imagen").objectFit = pregunta.objectFit;

  desordenarRespuestas(pregunta);

  if (pregunta.imagen) {
        select_id("imagen").setAttribute("src", pregunta.imagen);
        style("imagen").height = "300px";
        style("imagen").width = "100%";
  } else {
        style("imagen").height = "0px";
        style("imagen").width = "0px";
        setTimeout(() => { select_id("imagen").setAttribute("src", ""); }, 500);
  }
}

//Con esto desordenamos las respuestas para que no estén siempre en el mismo orden
function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3,
  ];

  posibles_respuestas.sort(() => Math.random() - 0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) {
  if (suspender_botones) {
    return;
  }

  suspender_botones = true;

  if (posibles_respuestas[i] == pregunta.respuesta) {
        preguntas_correctas++;
        btn_correspondiente[i].style.background = "#29ff29";
  } else {
        btn_correspondiente[i].style.background = "red";
  }


  for (let j = 0; j < 4; j++) {
    if (posibles_respuestas[j] == pregunta.respuesta) {
        btn_correspondiente[j].style.background = "#29ff29";
        break;
    }
  }
  setTimeout(() => { reiniciar(); suspender_botones = false; }, 3000);
}

function reiniciar() {
  for (const btn of btn_correspondiente) {
    btn.style.background = "#000056";
  }
  
  seleccionarPreguntaAleatoria();
}




