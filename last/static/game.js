const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const tileSize = 20;
const tileCount = canvas.width / tileSize;

let snakeX = 0;
let snakeY = 0;
let snakeXSpeed = 1;
let snakeYSpeed = 0;

let foodX = 0;
let foodY = 0;

const snakeTrail = [];
let tailLength = 1;

function update() {
  snakeX += snakeXSpeed;
  snakeY += snakeYSpeed;

  snakeX = Math.floor(snakeX);
  snakeY = Math.floor(snakeY);

  if (snakeX >= tileCount) {
    snakeX = 0;
  } else if (snakeX < 0) {
    snakeX = tileCount - 1;
  }

  if (snakeY >= tileCount) {
    snakeY = 0;
  } else if (snakeY < 0) {
    snakeY = tileCount - 1;
  }

  context.fillStyle = "#000000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#ffffff";
  for (let i = 0; i < snakeTrail.length; i++) {
    context.fillRect(snakeTrail[i].x * tileSize, snakeTrail[i].y * tileSize, tileSize, tileSize);

    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY && i !== snakeTrail.length - 1) {
      tailLength = 1;
    }
  }

  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailLength) {
    snakeTrail.shift();
  }

  if (foodX === snakeX && foodY === snakeY) {
    tailLength++;
    generateFood();
  }

  context.fillStyle = "#ff0000";
  context.fillRect(foodX * tileSize, foodY * tileSize, tileSize, tileSize);

  // 調整遊戲速度，這裡設定每 150 毫秒更新一次
  setTimeout(() => {
    requestAnimationFrame(update);
  }, 150);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    if (snakeYSpeed !== 1) {
      snakeXSpeed = 0;
      snakeYSpeed = -1;
    }
  } else if (event.key === "ArrowDown") {
    if (snakeYSpeed !== -1) {
      snakeXSpeed = 0;
      snakeYSpeed = 1;
    }
  } else if (event.key === "ArrowLeft") {
    if (snakeXSpeed !== 1) {
      snakeXSpeed = -1;
      snakeYSpeed = 0;
    }
  } else if (event.key === "ArrowRight") {
    if (snakeXSpeed !== -1) {
      snakeXSpeed = 1;
      snakeYSpeed = 0;
    }
  }
});

function generateFood() {
  foodX = Math.floor(Math.random() * tileCount);
  foodY = Math.floor(Math.random() * tileCount);
}

generateFood();

update();
