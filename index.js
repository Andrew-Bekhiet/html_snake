const initialSnake = [0, 1, 2];
const gridSize = 20;

let intervalID;
let direction = "right";
let headIndex = 3;

let pts = 0;
let row = 0;
let snake = [...initialSnake];
let appleIndex;

const grid = document.getElementById("grid");

function indexToCoords(index) {
  return [index % gridSize, Math.floor(index / gridSize)];
}

function coordsToIndex([x, y]) {
  return x + gridSize * y;
}

function calcNewHeadValue(dir, head) {
  let [x, y] = indexToCoords(head);
  let newHead;

  switch (dir) {
    default:
    //fallthrough
    case "right":
      if (x + 1 >= gridSize) newHead = [0, y];
      else newHead = [x + 1, y];

      return coordsToIndex(newHead);
    case "left":
      if (x - 1 < 0) newHead = [gridSize - 1, y];
      else newHead = [x - 1, y];

      return coordsToIndex(newHead);
    case "up":
      if (y - 1 < 0) newHead = [x, gridSize - 1];
      else newHead = [x, y - 1];

      return coordsToIndex(newHead);
    case "down":
      if (y + 1 >= gridSize) newHead = [x, 0];
      else newHead = [x, y + 1];

      return coordsToIndex(newHead);
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

function maybeEatApple(snake, appleIndex) {
  if (snake.includes(appleIndex)) {
    return {
      newScore: pts + 1,
      newAppleIndex: Math.floor(Math.random() * gridSize * gridSize),
    };
  } else {
    return {
      newScore: pts,
      newAppleIndex: appleIndex,
    };
  }
}

function initGrid() {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-space");
    grid.appendChild(div);
  }
}

function repaint(snake, appleIndex) {
  const allGridElems = document.querySelectorAll(".grid-space");

  allGridElems.forEach((e, i) => {
    if (snake.includes(i)) {
      e.classList.add("snaky");
      e.classList.remove("apple");
    } else if (i === appleIndex) {
      e.classList.add("apple");
    } else {
      e.classList.remove("snaky", "apple");
    }
  });

  document.getElementById("pts").innerHTML = pts;
}

function tick() {
  let { newHeadIndex, newSnake } = move(direction, snake, headIndex);

  headIndex = newHeadIndex;
  snake = newSnake;

  console.dir({ newHeadIndex, newSnake });

  let { newScore, newAppleIndex } = maybeEatApple(snake, appleIndex);

  appleIndex = newAppleIndex;
  if (pts != newScore) {
    pts = newScore;
    let tail = snake[0];

    let { newHeadIndex, newSnake } = move(direction, snake, headIndex);

    snake = [tail, ...newSnake];
    headIndex = newHeadIndex;
  }

  repaint(snake, appleIndex);
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
  appleIndex = Math.floor(Math.random() * gridSize * gridSize);

  initGrid();
  repaint(snake, appleIndex);

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
for (let i = 0; i < gridSize * gridSize; i++) {
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
