const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let score = 0;
let life = 3;
const ball = {
  x: 320,
  y: 430,
  vx: 5,
  vy: -2,
  radius: 15,
  color: "#ff8ff",
  draw: function () {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
  move: function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.top() + this.vy < 0) {
      this.vy *= -1;
    }
    if (this.right() + this.vx > canvas.width || this.left() + this.vx < 0) {
      this.vx *= -1;
    }
  },
  newPos() {
    this.x;
    this.y;
  },
  top: function () {
    return this.y - this.radius;
  },
  bottom: function () {
    return this.y + this.radius;
  },
  left: function () {
    return this.x - this.radius;
  },
  right: function () {
    return this.x + this.radius;
  },
  crashWith: function (obstaculo) {
    return !(
      this.bottom() < obstaculo.top() ||
      this.top() > obstaculo.bottom() ||
      this.right() < obstaculo.left() ||
      this.left() > obstaculo.right()
    );
  },
};
const player = {
  x: 250,
  y: 455,
  width: 150,
  height: 20,
  draw: function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  moveLeft: function () {
    if (this.x > 0) this.x -= 10;
  },
  moveRight: function () {
    if (this.x < 700 - this.width) this.x += 10;
  },
  left: function () {
    return this.x;
  },
  right: function () {
    return this.x + this.width;
  },
  top: function () {
    return this.y;
  },
  bottom: function () {
    return this.y + this.height;
  },
};

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 20;
    this.color = "blue";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
}
const bricks = [
  new Brick(20, 20),
  new Brick(20, 80),
  new Brick(120, 20),
  new Brick(120, 80),
  new Brick(20, 140),
  new Brick(20, 200),
  new Brick(120, 140),
  new Brick(120, 200),
  new Brick(220, 20),
  new Brick(220, 80),
  new Brick(220, 140),
  new Brick(220, 200),
  new Brick(320, 20),
  new Brick(320, 80),
  new Brick(320, 140),
  new Brick(320, 200),
  new Brick(420, 20),
  new Brick(420, 80),
  new Brick(420, 140),
  new Brick(420, 200),
  new Brick(520, 20),
  new Brick(520, 80),
  new Brick(520, 140),
  new Brick(520, 200),
  new Brick(620, 20),
  new Brick(620, 80),
  new Brick(620, 140),
  new Brick(620, 200),
];
function updateBricks() {
  for (let i = 0; i < bricks.length; i += 1) {
    bricks[i].draw();
  }
}
function checkColide() {
  for (let i = 0; i < bricks.length; i += 1) {
    const colision = ball.crashWith(bricks[i]);
    if (colision) {
      ball.vy *= -1;
      bricks.splice(i, 1);
      score += 10;
      if (score === 280) {
        alert("YOU WIN!");
      }
    }
  }
}
function checkColidePlayer() {
  const colision = ball.crashWith(player);
  if (colision) {
    ball.vy *= -1;
  }
}
function resetBall() {
  ball.x = 320;
  ball.y = 430;
  ball.vx = 5;
  ball.vy = -2;
}
function resetPlayer() {
  player.x = 250;
  player.y = 455;
  player.width = 150;
  player.height = 20;
}
function checkColideBottom() {
  if (ball.bottom() > canvas.height) {
    resetBall();
    resetPlayer();
    life -= 1;
    if (life === 0) {
      alert("GAMEOVER");
    }
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.code;
  if (key === "ArrowLeft") {
    player.moveLeft();
  }
  if (key === "ArrowRight") {
    player.moveRight();
  }
});
const myScore = {
  x: 50,
  y: 10,
  draw: function () {
    ctx.fillStyle = "red";
    ctx.fillText(`SCORE: ${score}`, this.x, this.y);
  },
};
const myLife = {
  x: 600,
  y: 10,
  draw: function () {
    ctx.fillStyle = "red";
    ctx.fillText(`LIFE: ${life}`, this.x, this.y);
  },
};
function reiniciar() {
  if (score === 280 || life === 0) {
    alert('recarregue a pagina!')
  }
};

function update() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  checkColidePlayer();
  ball.move();
  ball.draw();
  player.draw();
  myScore.draw();
  myLife.draw();
  checkColide();
  updateBricks();
  checkColideBottom();
  reiniciar();
}

let intevalId = setInterval(update, 20);

