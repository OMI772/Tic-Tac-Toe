const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currPlayer;
let gameGrid;

const winningPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initGame();
//initial situation of new Game
function initGame() {
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  currPlayer = "X";
  boxes.forEach((box, index) => {
    box.innerText = "";
    gameGrid[index] = "";
    box.classList.remove("win");
    box.style.pointerEvents = "";
  });

  newGamebtn.classList.remove(".active");
  gameInfo.innerText = `Current player - ${currPlayer}`;
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currPlayer;
    gameGrid[index] = currPlayer;
    //to swap the turn
    swap();
    //check wether the game is over or not
    checkGameOver();
  }
}

function swap() {
  if (currPlayer === "X") {
    currPlayer = "0";
  } else {
    currPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currPlayer}`;
}

function checkGameOver() {
  let winner = "";
  newGamebtn.classList.add("active");
  winningPos.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");

      winner = gameGrid[position[0]];
    }
    if (winner !== "") {
      gameInfo.innerText = `Winner - ${winner}`;
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      return;
    }

    let fillcnt = 0;
    gameGrid.forEach((box) => {
      if (box !== "") {
        fillcnt++;
      }
    });
    if (fillcnt === 9) {
      gameInfo.innerText = "Game Tied !";
    }
  });
}

newGamebtn.addEventListener("click", initGame);
