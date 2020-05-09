const canvas = document.querySelector("canvas");
const btnGenTree = document.getElementById("btn-generate-tree");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save(); // guarda el estado actual del canvas (?)
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate(angle * Math.PI / 180); // se pasa el angulo en grados, se lo conviere a radianes
  ctx.moveTo(0, 0); //comienza un nuevo subpath en el punto especificado
  ctx.lineTo(0, -len); //len es la longitud del segmento, con y negativo para que vaya hacia arriba (?)
  ctx.stroke();
  if (len < 10) { //corto para evitar un bucle infinito
    ctx.restore(); //vuelve el canvas al estado guardo con ctx.save()
    return;
  }
  drawTree(0, -len, len * 0.78, angle + 10, branchWidth*0.78);
  drawTree(0, -len, len * 0.78, angle - 10, branchWidth*0.78);
  ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 120, 0, 10, "white", "green");
