
const canvas = document.getElementById("bubblesCanvas");
const ctx = canvas.getContext("2d");
const resetButton = document.getElementById("resetButton");


const circles = [
  { x: 50, y: 50, color: "yellow", hit: false },
  { x: 50, y: 100, color: "blue", hit: false },
  { x: 50, y: 150, color: "red", hit: false },
  { x: 50, y: 200, color: "green", hit: false },
];

const arrows = [
  { x: 350, y: 50, moving: false },
  { x: 350, y: 100, moving: false },
  { x: 350, y: 150, moving: false },
  { x: 350, y: 200, moving: false },
];


function drawCircles() {
  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = circle.hit ? "gray" : circle.color; // Change color if hit
    ctx.fill();
    ctx.closePath();
  });
}


function drawArrows() {
  arrows.forEach((arrow, index) => {
    ctx.beginPath();
    ctx.moveTo(arrow.x + 30, arrow.y);
    ctx.lineTo(arrow.x - 20, arrow.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();


    ctx.beginPath();
    ctx.moveTo(arrow.x + 15, arrow.y - 10); 
    ctx.lineTo(arrow.x - 25, arrow.y); 
    ctx.lineTo(arrow.x + 15, arrow.y + 10); 
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  });
}


function update() {
  arrows.forEach((arrow, index) => {
    if (arrow.moving && !circles[index].hit) {
      arrow.x -= 5; 

      if (arrow.x <= circles[index].x + 20) {
        arrow.x = circles[index].x + 20; 
        circles[index].hit = true; 
        arrow.moving = false; 
      }
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircles();
  drawArrows();
}


function animate() {
  update();
  draw();
  requestAnimationFrame(animate);
}


canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  circles.forEach((circle, index) => {
    const distance = Math.sqrt(
      (mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2
    );

    if (distance <= 20 && !circle.hit) {
      arrows[index].moving = true; 
    }
  });
});

resetButton.addEventListener("click", () => {
  circles.forEach((circle) => (circle.hit = false));
  arrows.forEach((arrow, index) => {
    arrow.x = 350;
    arrow.moving = false;
  });
  draw();
});


animate();

