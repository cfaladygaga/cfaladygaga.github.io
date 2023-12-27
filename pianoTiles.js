const start = document.querySelector(".start");
const game = document.querySelector("#game");
const sco = document.getElementById("score");
const music = document.getElementById("music");
const playSound = document.getElementById("play");
const out = document.getElementById("out");
const results = document.getElementById("result");
const result_box = document.querySelector(".result_box");
const restart = document.querySelector(".restart");
const text = document.querySelector(".score_text");
const pokerface = document.getElementById("pokerFace");
let a;
let tileLifetime = 2000;
let gameStarted = false;
var count = 1;
var score = 0;
var column = laneToSpawn(),
  lastColumn;
var gameOver = false;
let test = [];

const columnKeys = {
  65: 0,
  83: 25,
  75: 50,
  76: 75,
};

function viewResult() {
  if (!gameOver) {
    test.forEach((element) => clearInterval(element));
    $(".move").remove();
    out.play();
    results.play();
    gameOver = true;
  }

  game.style.display = "none";
  result_box.classList.add("activeResult");
  text.innerText = "You've scored " + score + " points";
}

restart.onclick = () => {
  setTimeout(function () {
    start.style.display = "block";
    result_box.classList.remove("activeResult");
    sco.innerText = 0;
    pokerface.currentTime = 10000;
    gameOver = false;
    startGame();
  }, 250);
};

function startAudio() {
  pokerface.play();
}

function startGame() {
  playSound.play();
  game.style.display = "block";
  start.style.display = "none";
  score = 0;
  spawnTile(500);
  setTimeout(startAudio, 1000);
}

music.addEventListener("ended", () => {
  pokerface.currentTime = 0;
  pokerface.play();
});

function spawnTile(spawnTimer) {
  a = setInterval(createTile, spawnTimer);
}

function outs() {
  pokerface.pause();
  setTimeout(viewResult, 0);
}

function createTile() {
  var tile = document.createElement("div");
  var image = document.createElement("img");

  image.src = "Resources/beef.png";
  image.draggable = false;
  tile.appendChild(image);

  do {
    lastColumn = laneToSpawn();
  } while (column == lastColumn)
  {
    column = lastColumn;
  }

  tile.style.marginLeft = column + "%";
  setTimeout(moveDown, 100, tile, image);
  image.onclick = () => {
    updateScore();
    image.style.display = "none";
  };
  document.getElementById("tiles").prepend(tile);
}

function laneToSpawn() {
  return 25 * Math.floor(Math.random() * 4);
}

function moveDown(tile, img) {
  tile.classList.add("move");
  gameStarted = true;
  tileLifetime = 3000;
  test.push(setTimeout(removeDiv, tileLifetime, tile, img));
}

function updateScore() {
  score++;
  sco.innerText = score;
}

function removeDiv(e, img) {
  var imgHidden = img.style.display;
  // stop the game if tile not clicked
  if (imgHidden !== "none") {
    console.log("cenoura");
    clearInterval(a);
    outs();
  }
  e.remove();
}

document.addEventListener("keydown", function (event) {
  if (!gameStarted) {
    // Barra de espaço pressionada e o jogo não iniciou
    if (event.keyCode === 32) {
      startGame();
    }
  } else if (columnKeys.hasOwnProperty(event.keyCode)) {
    // Verifica se a tecla pressionada corresponde a uma coluna
    var columnPosition = columnKeys[event.keyCode];
    var tileInColumn = document.querySelector(
      `.move[style*="margin-left: ${columnPosition}%"] img`
    );

    // Verifica se há uma tile na coluna pressionada
    if (tileInColumn) {
      updateScore();
      tileInColumn.style.display = "none";
    }
  }
});

start.onclick = () => {
  //play start sound
  startGame();
};
