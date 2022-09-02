/*
LINES FRACTAL TREE.

Un ejemplo de árbol fractal en javascript. 
Hay muchos tutoriales en youtube con distintas variantes,
en este se usa canvas para dibujar el árbol (otros usan p5.js)

La idea del proyecto es practicar la recursividad, es decir,
una función que al finalizar su ejecución se llama nuevamente a
si misma pasándose nuevos valores hasta alcanzar un criterio de corte.

En este caso, ciclo a ciclo generaremos dos ramas partiendo del final
de la rama anterior, las cuales se inclinarán un cierto ángulo y se
reducirán una cierta proporción en longitud y grosor. El proceso
continúa hasta alcanzar una longitud mínima de corte en las ramas.
Jugando con los ángulos de inclinación y factores de reducción se pueden
obtener distintos diseños.

La aplicación presenta al usuario una serie de menúes desplegables en los que
se puede asignar valores a las variables que hacen al diseño del árbol.

*/

/* Canvas-------------------------- */
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

// Funciones Auxiliares:

function byID(id) {
  // Acorta la sintaxis de getElementById
  return document.getElementById(id);
}

/* Control Panel ------------------*/

function angleSelect(id) {
  //Genera las opciones de factor angular
  const select = byID(id);
  for (let i = 5; i <= 45; i += 5) {
    select.innerHTML += "<option value=" + i + ">" + i + "</option>";
  }
}

function factorSelect(id) {
  //Genera las opciones de factor de reduccion
  const select = byID(id);
  for (let i = 0; i <= 30; i++) {
    let factor = 0.5 + i * 0.01;
    if (i === 30) {
      select.innerHTML +=
        "<option value=" +
        factor +
        " selected='selected'>" +
        factor.toFixed(2) +
        "</option>";
    } else {
      select.innerHTML +=
        "<option value=" + factor + ">" + factor.toFixed(2) + "</option>";
    }
  }
}

/* Arbolito------------------------- */

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  // Esta función es la que se encarga de generar el arbol fractal
  // Recibe el ángulo, longitud y grosor de las ramas, así como los colores
  // Dibuja las ramas en el canvas y calcula los valores para la siguiente
  // iteración en base a los valores de los select.

  ctx.beginPath();
  ctx.save(); // guarda el estado actual del canvas (?)
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180); // se pasa el angulo en grados, se lo conviere a radianes
  ctx.moveTo(0, 0); //comienza un nuevo subpath en el punto especificado
  ctx.lineTo(0, -len); //len es la longitud del segmento, con y negativo para que vaya hacia arriba (?)
  ctx.stroke();

  // Obtengo los valores de cambio de la configuración del usuario.
  // Estos determinan cuanto variará el ángulo, longitud y factor.
  // Notar que el desvanecimiento está
  const rAngDelta = Number(byID("right-angle-select").value);
  const lAngDelta = Number(byID("left-angle-select").value);
  const redFactor = Number(byID("factor-select").value);
  const fade = 0.66; // Factor de afinamiento de las ramas en cada generación

  if (len < 10) {
    //corto para evitar un bucle infinito
    ctx.restore(); //vuelve el canvas al estado guardo con ctx.save()
    return;
  }
  drawTree(0, -len, len * redFactor, angle + lAngDelta, branchWidth * fade);
  drawTree(0, -len, len * redFactor, angle - rAngDelta, branchWidth * fade);
  ctx.restore();
}

//Eventos
/* Voy a escuchar el cambio en todos los selects. 
Cuando se cambia un valor se limpia el canvas y se vuelve
a dibujar el árbol con los nuevos valores seleccionados */

const selects = document.getElementsByTagName("select");

for (let i = 0; i < selects.length; i++) {
  selects[i].addEventListener("change", (e) => {
    console.log("se");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(
      canvas.width / 2,
      canvas.height - 100,
      canvas.height / 6,
      0,
      15,
      "white",
      "green"
    );
  });
}

// MAIN

//genero las opciones del panel
factorSelect("factor-select");
angleSelect("left-angle-select");
angleSelect("right-angle-select");

// Dibujo el arbol
drawTree(
  canvas.width / 2,
  canvas.height - 100,
  canvas.height / 6,
  0,
  10,
  "white",
  "green"
);
