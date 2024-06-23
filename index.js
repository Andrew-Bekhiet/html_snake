let intervalID;
const initialSnake = [0, 1, 2, 3];
let direction = "right";
let headIndex = 3;

let pts = 0;
let row = 0;
let snake = [...initialSnake];

const grid = document.getElementById("grid");

function indexToCoords(index) {
  return [index % 10, Math.floor(index / 10)];
}

function coordsToIndex([x, y]) {
  return x + 10 * y;
}

function calcNewHeadValue(dir, head) {
  switch (dir) {
    default:
    //fallthrough
    case "right":
      return head + 1;
    case "left":
      return head - 1;
    case "up":
      return head - 10;
    case "down":
      return head + 10;
  }
}

function move(dir, currentSnake, currentHeadIndex) {
  let snakeCopy = [...currentSnake];

  let head = snakeCopy[snakeCopy.length - 1];
  let newHeadValue = calcNewHeadValue(dir, head);

  console.dir({ head, newHeadValue });

  if (snakeCopy.includes(newHeadValue)) {
    // reverse direction
    head = snakeCopy[0];
    newHeadValue = calcNewHeadValue(dir, head);

    snakeCopy.pop();

    const newSnake = [newHeadValue, ...snakeCopy].reverse();

    return {
      newHeadIndex: newSnake.length - 1,
      newSnake,
    };
  } else {
    snakeCopy.shift();

    const newSnake = [...snakeCopy, newHeadValue];

    return {
      newHeadIndex: newSnake.length - 1,
      newSnake: newSnake,
    };
  }
}

function repaint(snake) {
  const allGridElems = document.querySelectorAll(".grid-space");

  allGridElems.forEach((e, i) => {
    if (snake.includes(i)) {
      e.classList.add("snaky");
    } else {
      e.classList.remove("snaky");
    }
  });
}

function tick() {
  let { newHeadIndex, newSnake } = move(direction, snake, headIndex);

  headIndex = newHeadIndex;
  snake = newSnake;

  console.dir({ newHeadIndex, newSnake });
  repaint(snake);
}

function startGame() {
  if (intervalID) {
    clearInterval(intervalID);
  }

  grid.innerHTML = "";
  direction = "right";
  pts = 0;
  row = 0;
  snake = [...initialSnake];

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
  intervalID = setInterval(tick, 500);
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

startGameBtn.addEventListener("click", startGame);

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

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});
