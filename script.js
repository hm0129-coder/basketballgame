let playerName = "";
let gameStarted = false;
function startGame() {
  const input = document.getElementById("nameInput").value;

  if (input.trim() === "") {
    alert("이름을 입력해주세요!");
    return;
  }

  playerName = input;
  gameStarted = true;

  shots = 0;
  score = 0;

  document.getElementById("nameInput").style.display = "none";
}
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
ball.dy = -6 - Math.random() * 2; // 힘 랜덤
ball.dx = (Math.random() - 0.5) * 2; // 좌우 흔들림
ball.y += ball.dy;
ball.x += ball.dx;
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
  ctx.fillText("부용중 농구부로 문의하세요! 🏀", 50, 300);

  saveScore(playerName, score);
  showScores();
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
function saveScore(name, score) {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.push({ name: name, score: score });

  // 점수 높은 순으로 정렬
  scores.sort((a, b) => b.score - a.score);

  // 상위 5명만 저장
  scores = scores.slice(0, 5);

  localStorage.setItem("scores", JSON.stringify(scores));
}
function showScores() {
  const list = document.getElementById("scoreBoard");
  list.innerHTML = "";

  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  scores.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.name} : ${s.score}점`;
    list.appendChild(li);
  });
}
showScores();
let hoopSpeed = 2; // 골대 이동 속도
draw();
hoop.x += hoopSpeed;
// 벽에 닿으면 방향 반전
if (hoop.x <= 50 || hoop.x + hoop.w >= canvas.width - 50) {
 hoopSpeed *= -1;
}
