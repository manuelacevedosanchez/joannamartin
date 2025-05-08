const iconArea = document.getElementById("iconArea");
let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const foods = ["🍕", "🍓", "🍉", "🍩", "🍪", "🍇"];
const bombs = ["💣", "💥"];

function createIcon() {
  const icon = document.createElement("div");
  icon.classList.add("icon");

  const isBomb = Math.random() < 0.2; // 20% probabilidad de bomba
  icon.textContent = isBomb ? bombs[Math.floor(Math.random() * bombs.length)] : foods[Math.floor(Math.random() * foods.length)];

  icon.style.left = Math.random() * (iconArea.offsetWidth - 30) + "px";
  icon.style.top = Math.random() * (iconArea.offsetHeight - 30) + "px";

  icon.onclick = () => {
    icon.remove();
    if (isBomb) {
      score = Math.max(0, score - 1);
    } else {
      score++;
    }
    document.getElementById("score").textContent = `Puntuación: ${score}`;
  };

  iconArea.appendChild(icon);
  setTimeout(() => icon.remove(), 3000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").textContent = `Tiempo: ${timeLeft}`;
  if (timeLeft <= 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    document.getElementById("finalMessage").textContent = `⏰ ¡Se acabó el tiempo! Tu puntuación final es: ${score} 🎉`;
  }
}

function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById("score").textContent = "Puntuación: 0";
  document.getElementById("timer").textContent = "Tiempo: 30";
  document.getElementById("finalMessage").textContent = "";

  gameInterval = setInterval(createIcon, 600);
  timerInterval = setInterval(updateTimer, 1000);
}

startGame();

// Inicializar el carrusel de fotos
const swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });  