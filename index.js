const grid = document.getElementById("grid");
let direction = "right";
let pts = 0;
let row = 0;
let snake = [0, 1, 2];

const startGameBtn = document.getElementById("startGame");

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
  snake = [0, 1, 2];
  startGame();
});

const startGame = () => {
  for (let i = 0; i < 100; i++) {
    const div = document.createElement("div");
    div.classList.add("grid-space");
    grid.appendChild(div);
  }

  const allGridElems = document.querySelectorAll(".grid-space");

  snake.forEach((s) => {
    allGridElems[s].classList.add("snaky");
  });
  // add any code you need to start the game
  // like setting the direction or helper functions to eat an apple

  const moveSnake = setInterval(() => {
    // add code here to move snake
  }, 1000);
};
