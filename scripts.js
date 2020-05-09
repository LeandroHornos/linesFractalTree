/* Canvas-------------------------- */
const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

/* Control Panel ------------------*/

//genero las opciones del panel
factorSelect("factor-select");
angleSelect("left-angle-select");
angleSelect("right-angle-select");

let rAngF = Number(byID("right-angle-select").value);
let lAngF = Number(byID("left-angle-select").value);
let redF = Number(byID("factor-select").value);

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
  if (len < 10) {
    //corto para evitar un bucle infinito
    ctx.restore(); //vuelve el canvas al estado guardo con ctx.save()
    return;
  }
  drawTree(0, -len, len * redF, angle + lAngF, branchWidth * 0.66);
  drawTree(0, -len, len * redF, angle - rAngF, branchWidth * 0.66);
  ctx.restore();
}
// Funciones Auxiliares:

function byID(id) {
  return document.getElementById(id);
}

drawTree(
  canvas.width / 2,
  canvas.height - 100,
  canvas.height / 6,
  0,
  10,
  "white",
  "green"
);

//Events
const selects = document.getElementsByTagName("select");

for (let i = 0; i < selects.length; i++) {
  selects[i].addEventListener("change", (e) => {
    console.log("se");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rAngF = Number(byID("left-angle-select").value);
    lAngF = Number(byID("right-angle-select").value);
    redF = Number(byID("factor-select").value);
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
