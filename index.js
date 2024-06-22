let intervalID;
const initialSnake = [0, 1, 2, 3];

function indexToCoords(index) {
  return [index % 10, Math.floor(index / 10)];
}

function coordsToIndex([x, y]) {
  return x + 10 * y;
}

function move(dir, currentSnake) {
  let snakeCopy = [...currentSnake].sort((a, b) => a - b);
  let head;

  switch (dir) {
    default:
    //fallthrough
    case "right":
      snakeCopy.shift();
      head = snakeCopy[snakeCopy.length - 1];
      return [...snakeCopy, head + 1];
    case "left":
      snakeCopy.pop();
      head = snakeCopy[0];
      return [...snakeCopy, head - 1];
    case "up":
      snakeCopy.pop();
      head = snakeCopy[0];
      return [...snakeCopy, head - 10];
    case "down":
      snakeCopy.shift();
      head = snakeCopy[snakeCopy.length - 1];
      return [...snakeCopy, head + 10];
  }
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

const grid = document.getElementById("grid");
let direction = "right";
let pts = 0;
let row = 0;
let snake = new Set(initialSnake);

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
    snake = new Set(move(direction, Array.from(snake)));
    console.log(snake);
    repaint(snake);
  }, 1000);
};
