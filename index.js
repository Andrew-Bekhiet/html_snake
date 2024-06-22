let running = false;

function indexToCoords(index) {
  return [index % 10, Math.floor(index / 10)];
}

function coordsToIndex([x, y]) {
  return x + 10 * y;
}

function move(direction, currentSnake) {
  switch (direction) {
    default:
    //fallthrough
    case "right":
      return currentSnake.map((i) => i + 1);
    case "left":
      return currentSnake.map((i) => i - 1);
    case "up":
      return currentSnake.map((i) => i + 10);
    case "down":
      return currentSnake.map((i) => i - 10);
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
let snake = new Set([0, 1, 2]);

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
  snake = new Set([0, 1, 2]);
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
  running = true;

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

  let intervalID;
  intervalID = setInterval(() => {
    if (!running) {
      clearInterval(intervalID);
      return;
    }

    snake = new Set(move(direction, Array.from(snake)));
    console.log(snake);
    repaint(snake);
  }, 1000);
};
