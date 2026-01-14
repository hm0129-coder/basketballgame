const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ball = { x: 180, y: 520, r: 10, dy: 0 };
let hoop = { x: 130, y: 120, w: 100, h: 10 };

let score = 0;
let shots = 0;
let shooting = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 골대
  ctx.fillStyle = "black";
  ctx.fillRect(hoop.x, hoop.y, hoop.w, hoop.h);

  // 공
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();

  // 점수
  ctx.fillStyle = "black";
  ctx.fillText(`점수: ${score} / ${shots}`, 10, 20);

  // 공 이동
  if (shooting) {
    ball.y += ball.dy;

    if (
      ball.y < hoop.y + 10 &&
      ball.x > hoop.x &&
      ball.x < hoop.x + hoop.w
    ) {
      score++;
      shooting = false;
      resetBall();
    }

    if (ball.y < 0) {
      shooting = false;
      resetBall();
    }
  }

  // 게임 종료
  if (shots >= 10) {
    ctx.fillStyle = "red";
    ctx.font = "20px Arial";
    ctx.fillText("부용중 농구부로 오세요! 🏀", 50, 300);
    return;
  }

  requestAnimationFrame(draw);
}

function resetBall() {
  ball.y = 520;
  ball.dy = 0;
}

canvas.addEventListener("touchstart", () => {
  if (!shooting && shots < 10) {
    ball.dy = -6;
    shooting = true;
    shots++;
  }
});

draw();
