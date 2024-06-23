let intervalID;
const initialSnake = [0, 1, 2, 3];
let direction = "right";
let headIndex = 3;

let pts = 0;
let row = 0;
let snake = new Set(initialSnake);

const grid = document.getElementById("grid");

function indexToCoords(index) {
  return [index % 10, Math.floor(index / 10)];
}

function coordsToIndex([x, y]) {
  return x + 10 * y;
}

function move(dir, currentSnake, currentHeadIndex) {
  const head = currentSnake[currentSnake.length - 1];

  let newHeadValue;
  switch (dir) {
    default:
    //fallthrough
    case "right":
      newHeadValue = head + 1;
      break;
    case "left":
      newHeadValue = head - 1;
      break;
    case "up":
      newHeadValue = head - 10;
      break;
    case "down":
      newHeadValue = head + 10;
      break;
  }

  const sortingDir = currentSnake.includes(newHeadValue) ? -1 : 1;

  let snakeCopy = [...currentSnake].sort((a, b) => (a - b) * sortingDir);

  const newHeadIndex = sortingDir > 0 ? snakeCopy.length - 1 : 0;

  snakeCopy.shift();
  return [
    newHeadIndex,
    [...snakeCopy, newHeadValue].sort((a, b) => (a - b) * sortingDir),
  ];
}

function repaint(snake) {
  const allGridElems = document.querySelectorAll(".grid-space");

  allGridElems.forEach((e, i) => {
    if (snake.has(i)) {
      e.classList.add("snaky");
    } else {
      e.classList.remove("snaky");
    }
  });
}

const startGameBtn = document.getElementById("startGame");
const upBtn = document.getElementById("up");
const downBtn = document.getElementById("down");
const leftBtn = document.getElementById("left");
const rightBtn = document.getElementById("right");

// create board
for (let i = 0; i < 100; i++) {
  const div = document.createElement("div");
  div.classList.add("grid-space");
  grid.appendChild(div);
}

startGameBtn.addEventListener("click", () => {
  // add your code here
  grid.innerHTML = "";
  direction = "right";
  pts = 0;
  row = 0;
  snake = new Set(initialSnake);
  startGame();
});

upBtn.addEventListener("click", () => {
  direction = "up";
});
downBtn.addEventListener("click", () => {
  direction = "down";
});
leftBtn.addEventListener("click", () => {
  direction = "left";
});
rightBtn.addEventListener("click", () => {
  direction = "right";
});

const startGame = () => {
  if (intervalID) {
    clearInterval(intervalID);
  }

  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-space");
    grid.appendChild(div);
  }

  const allGridElems = document.querySelectorAll(".grid-space");

  console.log(snake);

  snake.forEach((i) => {
    allGridElems[i].classList.add("snaky");
  });
  // add any code you need to start the game
  // like setting the direction or helper functions to eat an apple
  intervalID = setInterval(() => {
    let [newHeadIndex, newSnake] = move(
      direction,
      Array.from(snake),
      headIndex
    );

    headIndex = newHeadIndex;
    snake = new Set(newSnake);

    console.dir({ newHeadIndex, newSnake });
    repaint(snake);
  }, 1000);
};
