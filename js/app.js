var handChoices = ["Rock", "Paper", "Scissors"];
const playerBoardHand = document.querySelector("#user-hand");
const enemyBoardHand = document.querySelector("#enemy-hand");
const hands = document.querySelectorAll(
  "#game-board > ul.hand-option-list > li"
);
var gameChart = document.querySelector(".game-chart");
var scoreboardUser = document.querySelector("#scoreboard-user");
var scoreboardEnemy = document.querySelector("#scoreboard-enemy");
var themetoogle = document.querySelector(".light-dark-theme");

// scoreboardUser = 0;
// scoreboardEnemy = 0;

function randomNumberGen() {
  return Math.floor(Math.random() * 3);
}

function getIaHand() {
  var enemysHand = randomNumberGen();
  console.log(enemysHand);

  if (enemysHand == 0) {
    return "Rock";
  } else if (enemysHand == 1) {
    return "Paper";
  } else if (enemysHand == 2) {
    return "Scissors";
  }
}

function gameAlgorithm(userHand) {
  hands.forEach((hand) => {
    hand.style.pointerEvents = "none";
  });
  var enemysHand = getIaHand();
  var feedbackMatch = "Jokenpô";
  gameChart.textContent = feedbackMatch;

  playerBoardHand.src = `src/images/Rock.png`;
  enemyBoardHand.src = `src/images/Rock.png`;

  playerBoardHand.classList.add("user-hand-animation");
  enemyBoardHand.classList.add("enemy-hand-animation");
  setTimeout(() => {
    playerBoardHand.src = `src/images/${userHand}.png`;
    enemyBoardHand.src = `src/images/${enemysHand}.png`;

    if (userHand == enemysHand) {
      feedbackMatch = "Draw!";
    } else if ((userHand == "Rock") & (enemysHand == "Paper")) {
      feedbackMatch = "You lost! Pick your next hand.";
      // gameChart.style.fontSize = "2rem";
      scoreboardEnemy.textContent = +scoreboardEnemy.textContent + 1;
    } else if ((userHand == "Paper") & (enemysHand == "Scissors")) {
      feedbackMatch = "You lost! Pick your next hand.";
      // gameChart.style.fontSize = "2rem";
      scoreboardEnemy.textContent = +scoreboardEnemy.textContent + 1;
    } else if ((userHand == "Scissors") & (enemysHand == "Rock")) {
      feedbackMatch = "You lost! Pick your next hand.";
      // gameChart.style.fontSize = "2rem";
      scoreboardEnemy.textContent = +scoreboardEnemy.textContent + 1;
    } else {
      feedbackMatch = "Victory! Let’s see if you can do it again.";
      gameChart.style.fontSize = "2rem";
      scoreboardUser.textContent = +scoreboardUser.textContent + 1;
    }

    gameChart.textContent = feedbackMatch;
    hands.forEach((hand) => {
      hand.style.pointerEvents = "auto";
    });
  }, 3000);
}

hands.forEach((hand) => {
  hand.addEventListener("click", () => {
    console.log("Você clicou em:", hand.querySelector("p").textContent);
    userChoice = hand.querySelector("p").textContent;
    setTimeout(() => {
      playerBoardHand.classList.remove("user-hand-animation");
      enemyBoardHand.classList.remove("enemy-hand-animation");
    }, 3000);
    gameAlgorithm(userChoice);
  });
});

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themetoogle.src =
    theme === "dark" ? "src/images/Sun.png" : "src/images/Moon.png";
}

function standartTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(systemPrefersDark ? "dark" : "light");
  }
}

function themeToogleEvent() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

standartTheme();
