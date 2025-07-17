

/*-------------------------------- Constants --------------------------------*/

const easy = [[
  ['-', '5', '-', '9', '-', '-', '2', '4', '-'],
  ['-', '-', '-', '6', '-', '-', '1', '9', '5'],
  ['9', '-', '-', '2', '-', '4', '-', '-', '3'],
  ['-', '9', '-', '3', '-', '-', '-', '-', '1'],
  ['-', '-', '-', '-', '-', '-', '4', '-', '9'],
  ['7', '4', '-', '-', '-', '1', '5', '-', '6'],
  ['-', '-', '-', '4', '-', '-', '3', '-', '-'],
  ['-', '-', '4', '-', '6', '-', '-', '5', '8'],
  ['-', '-', '9', '-', '3', '-', '6', '-', '-']
],[
  ['6', '5', '8', '9', '1', '3', '2', '4', '7'],
  ['4', '3', '2', '6', '8', '7', '1', '9', '5'],
  ['9', '1', '7', '2', '5', '4', '8', '6', '3'],
  ['2', '9', '6', '3', '4', '5', '7', '8', '1'],
  ['5', '8', '1', '7', '2', '6', '4', '3', '9'],
  ['7', '4', '3', '8', '9', '1', '5', '2', '6'],
  ['8', '6', '5', '4', '7', '9', '3', '1', '2'],
  ['3', '7', '4', '1', '6', '2', '9', '5', '8'],
  ['1', '2', '9', '5', '3', '8', '6', '7', '4']
]];
 
const Medium = [[
  ['-', '-', '-', '-', '7', '-', '-', '3', '-'],
  ['-', '-', '-', '8', '-', '1', '-', '-', '-'],
  ['-', '3', '-', '-', '-', '9', '-', '-', '-'],
  ['-', '-', '-', '7', '6', '-', '1', '8', '-'],
  ['-', '1', '-', '-', '-', '-', '-', '7', '-'],
  ['3', '8', '-', '-', '1', '5', '-', '-', '-'],
  ['-', '6', '-', '2', '8', '4', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '9', '-'],
  ['-', '-', '-', '3', '9', '-', '2', '1', '8']
],
[['9', '4', '8', '6', '7', '2', '5', '3', '1'],
  ['2', '7', '5', '8', '3', '1', '6', '4', '9'],
  ['6', '3', '1', '5', '4', '9', '8', '2', '7'],
  ['4', '9', '2', '7', '6', '3', '1', '8', '5'],
  ['5', '1', '6', '9', '2', '8', '3', '7', '4'],
  ['3', '8', '7', '4', '1', '5', '9', '6', '2'],
  ['1', '6', '9', '2', '8', '4', '7', '5', '3'],
  ['8', '2', '3', '1', '5', '7', '4', '9', '6'],
  ['7', '5', '4', '3', '9', '6', '2', '1', '8']]
];

const Hard = [[
  ['3', '-', '-', '-', '-', '-', '-', '4', '-'],
  ['-', '6', '-', '7', '-', '-', '8', '3', '-'],
  ['4', '-', '-', '-', '3', '-', '-', '-', '-'],
  ['-', '-', '-', '2', '8', '3', '5', '6', '-'],
  ['-', '-', '-', '1', '-', '4', '-', '-', '-'],
  ['-', '2', '-', '-', '-', '-', '-', '-', '4'],
  ['-', '-', '-', '-', '-', '-', '4', '-', '8'],
  ['-', '-', '-', '-', '-', '6', '-', '-', '-'],
  ['1', '-', '-', '4', '-', '-', '-', '-', '-']
],[
  ['3', '8', '5', '6', '9', '1', '7', '4', '2'],
  ['9', '6', '1', '7', '4', '2', '8', '3', '5'],
  ['4', '7', '2', '8', '3', '5', '6', '9', '1'],
  ['7', '1', '4', '2', '8', '3', '5', '6', '9'],
  ['6', '5', '9', '1', '7', '4', '2', '8', '3'],
  ['8', '2', '3', '5', '6', '9', '1', '7', '4'],
  ['5', '3', '6', '9', '1', '7', '4', '2', '8'],
  ['2', '4', '8', '3', '5', '6', '9', '1', '7'],
  ['1', '9', '7', '4', '2', '8', '3', '5', '6']
]];



let selectnum, selectTile;
let disSelect, level;
let gameOver = false;
let lives = 3;
let timerInterval;
let secondsElapsed = 0;


/*-------------------------------- Functions --------------------------------*/

window.onload = function() {
  id("Start").addEventListener("click", PlayGame);
  id("checkBtn").addEventListener("click", checkAllTiles);

  for (let num = 0; num < id("numbers-inserts").children.length; num++) {
    id("numbers-inserts").children[num].addEventListener("click", function() {
      if (!disSelect && !gameOver) {  
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
          selectnum = null;
        } else {
          for (let nm = 0; nm < 9; nm++) {
            id("numbers-inserts").children[nm].classList.remove("selected");
          }
          this.classList.add("selected");
          selectnum = this;
          updatemove();
        }
      }
    });
  }
};



function PlayGame() {
  lives = 3;
  id("lives").textContent = "Lives: " + lives;

  let board;

if (id("difer1").checked) {
  board = easy[0];
  level = "Easy";
} else if (id("difer2").checked) {
  board = Medium[0];
  level = "Medium";
} else {
  board = Hard[0];
  level = "Hard";
}

startTimer(); 


  disSelect = false;
  gameOver = false;
  generateBoard(board);
  id("numbers-inserts").classList.remove("hidden");
}


function generateBoard(boardArray) {
  clearPrev();
  let counter = 0;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let tile = document.createElement("p");

      const value = boardArray[row][col];
      if (value !== "-") {
        tile.textContent = value;
      } else {
        tile.addEventListener("click", function() {
          if (!disSelect && !gameOver) { 
            if (tile.classList.contains("selected")) {
              tile.classList.remove("selected");
              selectTile = null;
            } else {
              qsa(".tile").forEach(t => t.classList.remove("selected"));
              tile.classList.add("selected");
              selectTile = tile;
              updatemove();
            }
          }
        });
      }

      tile.id = counter;
      counter++;

      tile.classList.add("tile");

      if (level === "Easy") {
         if ((row === 0 && col === 0)|| (row === 1 && col === 0)|| (row === 2 && col === 0)) {
          tile.setAttribute("data-hint", "? + ? + 9 = 19");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 0 && col === 1)|| (row === 0 && col === 2)) {
          tile.setAttribute("data-hint", "5 + ? = 13");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 1 && col === 3)|| (row === 2 && col === 3)|| (row === 2 && col === 4)) {
          tile.setAttribute("data-hint", "6 + 2 + ? = 13");
          tile.style.backgroundColor = "#ffe1b3";
        }
         if ((row === 2 && col === 7)|| (row === 2 && col === 8)) {
          tile.setAttribute("data-hint", "? + 3 = 9");
          tile.style.backgroundColor = "#d1f0c4";
        }
        if ((row === 3 && col === 0)|| (row === 2 && col === 1)|| (row === 3 && col === 1)|| (row === 3 && col === 2)) {
          tile.setAttribute("data-hint", "? + 9+ ? + ? = 18");
          tile.style.backgroundColor = "#fdbcedff";
        }//#fdbcedff for 4  numbers add
         if ((row === 5 && col === 1)|| (row === 5 && col === 2)|| (row === 5 && col === 3)|| (row === 5 && col === 4)) {
          tile.setAttribute("data-hint", "4 + ?+?+ ?= 24");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 5 && col === 1)|| (row === 5 && col === 2)|| (row === 5 && col === 3)|| (row === 5 && col === 4)) {
          tile.setAttribute("data-hint", "4 + ?+?+ ?= 24");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 1 && col === 4)|| (row === 1 && col === 5)|| (row === 1 && col === 6)|| (row === 0 && col === 6)) {
          tile.setAttribute("data-hint", "? + ?+ 1 + 2= 18");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 5 && col === 6)|| (row === 5 && col === 7)|| (row === 5 && col === 8)) {
          tile.setAttribute("data-hint", "5 +? +6 = 13");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 7 && col === 5)|| (row === 7 && col === 6)|| (row === 7 && col === 7)) {
          tile.setAttribute("data-hint", "? +? +5= 16");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 7 && col === 3)|| (row === 7 && col === 4)) {
          tile.setAttribute("data-hint", "? +6= 7");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 5 && col === 5)|| (row === 6 && col === 5)|| (row === 6 && col === 6)) {
          tile.setAttribute("data-hint", "1+?+3=13");
          tile.style.backgroundColor = "#d1f0c4";
        }
        if ((row === 4 && col === 0)|| (row === 4 && col === 1)|| (row === 5 && col === 0)) {
          tile.setAttribute("data-hint", "7+?+?=20");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 4 && col === 2)|| (row === 4 && col === 3)|| (row === 3 && col === 3)) {
          tile.setAttribute("data-hint", "?+?+3=11");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 6 && col === 0)|| (row === 7 && col === 0)) {
          tile.setAttribute("data-hint", "? +? =11");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 6 && col === 1)|| (row === 6 && col === 2)) {
          tile.setAttribute("data-hint", "? +? =11");
          tile.style.backgroundColor = "#d1f0c4";
        }
        if ((row === 7 && col === 1)|| (row === 7 && col === 2)) {
          tile.setAttribute("data-hint", "? +4 =11");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 8 && col === 1)|| (row === 8 && col === 2)) {
          tile.setAttribute("data-hint", "? +9 =11");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 8 && col === 0)) {
          tile.setAttribute("data-hint", "? =1");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 8 && col === 5)) {
          tile.setAttribute("data-hint", "? =8");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 1 && col === 1)) {
          tile.setAttribute("data-hint", "? =3");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 8 && col === 3)|| (row === 8 && col === 4)) {
          tile.setAttribute("data-hint", "? +3 =8");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 6 && col === 7)|| (row === 6 && col === 8)) {
          tile.setAttribute("data-hint", "? +? =3");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 8 && col === 7)|| (row === 8 && col === 8)) {
          tile.setAttribute("data-hint", "? +? =11");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 0 && col === 4)|| (row === 0 && col === 5)) {
          tile.setAttribute("data-hint", "? +? =4");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 4 && col === 6)|| (row === 4 && col === 7)||(row === 4 && col === 8)) {
          tile.setAttribute("data-hint", "4+? +9 =16");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 3 && col === 4)|| (row === 3 && col === 5)) {
          tile.setAttribute("data-hint", "? +? =9");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 4 && col === 4)|| (row === 4 && col === 5)) {
          tile.setAttribute("data-hint", "? +? =8");
          tile.style.backgroundColor = "greenyellow";
        }
         if ((row === 4 && col === 4)|| (row === 4 && col === 5)) {
          tile.setAttribute("data-hint", "? +? =8");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 3 && col === 7)|| (row === 3 && col === 8)) {
          tile.setAttribute("data-hint", "? +1 =9");
          tile.style.backgroundColor = "greenyellow";
        }
        
      }

      if (level === "Medium") {
        
        if ((row === 0 && col === 3) ) {
          tile.setAttribute("data-hint", "? = 6");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 2 && col === 4) ) {
          tile.setAttribute("data-hint", "? = 4");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 1 && col === 8) ) {
          tile.setAttribute("data-hint", "? = 9");
          tile.style.backgroundColor = "yellow";
        }
        if ((row === 1 && col === 3)|| (row === 2 && col === 3)) {
          tile.setAttribute("data-hint", "8 +? =13");
          tile.style.backgroundColor = "yellowgreen";
        }

        if ((row === 2 && col === 1) || (row === 3 && col === 1)) {
          tile.setAttribute("data-hint", "3 + ? = 12");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 5 && col === 0) || (row === 6 && col === 0)||(row === 7 && col === 0) || (row === 8 && col === 0)) {
          tile.setAttribute("data-hint", "3 + ?+?+? = 19");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 2 && col === 0) || (row === 3 && col === 0)) {
          tile.setAttribute("data-hint", "? + ? = 10");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 0 && col === 0) || (row === 1 && col === 0)) {
          tile.setAttribute("data-hint", "? + ? = 11");
          tile.style.backgroundColor = "#cceaff";
        }
         if ((row === 5 && col === 7) || (row === 5 && col === 8)) {
          tile.setAttribute("data-hint", "? + ? = 8");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 3 && col === 2) || (row === 4 && col === 2)) {
          tile.setAttribute("data-hint", "? + ? = 8");
          tile.style.backgroundColor = "#cceaff";
        }
         if ((row === 3 && col === 3)|| (row === 4 && col === 3)) {
          tile.setAttribute("data-hint", "7+?= 16");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 3 && col === 4)|| (row === 4 && col === 4)) {
          tile.setAttribute("data-hint", "6+?= 8");
          tile.style.backgroundColor = "#cceaff";
        }
        if ((row === 0 && col === 1)|| (row === 0 && col === 2)) {
          tile.setAttribute("data-hint", "?+?=12");
          tile.style.backgroundColor = "#fdbcedff";
        }
         if ((row === 7 && col === 3)|| (row === 8 && col === 3)) {
          tile.setAttribute("data-hint", "?+3=4");
          tile.style.backgroundColor = "#fdbcedff";
        }
         if ((row === 8 && col === 5)|| (row === 8 && col === 6)|| (row === 8 && col === 7)) {
          tile.setAttribute("data-hint", "? +2+1= 9");
          tile.style.backgroundColor = "#ffe1b3";
        }
         if ((row === 6 && col === 6)|| (row === 6 && col === 7)|| (row === 6 && col === 8)) {
          tile.setAttribute("data-hint", "?+?+?= 15");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 4 && col === 6)|| (row === 4 && col === 7)|| (row === 4 && col === 8)) {
          tile.setAttribute("data-hint", "?+7+?= 14");
          tile.style.backgroundColor = "#ffe1b3";
        }
          if ((row === 1 && col === 4)|| (row === 0 && col === 4)|| (row === 0 && col === 5)) {
          tile.setAttribute("data-hint", "?+7+?=12");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 6 && col === 1)|| (row === 7 && col === 1)|| (row === 8 && col === 1)) {
          tile.setAttribute("data-hint", "6+?+?= 13");
          tile.style.backgroundColor = "#ffe1b3";
        }
          if ((row === 2 && col === 5)|| (row === 2 && col === 6)|| (row === 2 && col === 7)) {
          tile.setAttribute("data-hint", "9+?+?= 19");
          tile.style.backgroundColor = "#ffe1b3";
        }
        if ((row === 1 && col === 7)|| (row === 0 && col === 7)|| (row === 0 && col === 8)) {
          tile.setAttribute("data-hint", "?+3+?=8");
          tile.style.backgroundColor = "greenyellow";
        }
        if ((row === 1 && col === 5)|| (row === 1 && col === 6)|| (row === 0 && col === 6)) {
          tile.setAttribute("data-hint", "1+?+?=12");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 5 && col === 3)|| (row === 5 && col === 4)|| (row === 6 && col === 4)) {
          tile.setAttribute("data-hint", "?+1+8= 13");
          tile.style.backgroundColor = "yellowgreen";
        }
        if ((row === 6 && col === 2)|| (row === 7 && col === 2)|| (row === 8 && col === 2)|| (row === 6 && col === 3)) {
          tile.setAttribute("data-hint", "?+?+?+2= 18");
          tile.style.backgroundColor = "#cceaff";
        }
         if ((row === 7 && col === 6)|| (row === 7 && col === 7)|| (row === 7 && col === 8)|| (row === 8 && col === 8)) {
          tile.setAttribute("data-hint", "? + 9+ ? + 8= 27");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 3 && col === 6)|| (row === 3 && col === 7)|| (row === 3 && col === 8)|| (row === 2 && col === 8)) {
          tile.setAttribute("data-hint", "1+8+?+?= 21");
          tile.style.backgroundColor = "greenyellow";
        }
         if ((row === 6 && col === 5)|| (row === 7 && col === 5)|| (row === 7 && col === 4)|| (row === 8 && col === 4)) {
          tile.setAttribute("data-hint", "4 +?+?+9= 25");
          tile.style.backgroundColor = "greenyellow";
        }
          if ((row === 3 && col === 5)|| (row === 4 && col === 5)|| (row === 5 && col === 5)|| (row === 5 && col === 6)) {
          tile.setAttribute("data-hint", "?+?+5+?=25");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 4 && col === 0)|| (row === 4 && col === 1)|| (row === 5 && col === 1)|| (row === 5 && col === 2)) {
          tile.setAttribute("data-hint", "?+1+8+?=21");
          tile.style.backgroundColor = "#fdbcedff";
        }
        if ((row === 1 && col === 1)|| (row === 1 && col === 2)|| (row === 2 && col === 2)) {
          tile.setAttribute("data-hint", "?+?+?= 13");
          tile.style.backgroundColor = "#ffe1b3";
        }

      }
      

      if (row === 2 || row === 5) {
        tile.classList.add("bottomBorder");
      }
      if (col === 2 || col === 5) {
        tile.classList.add("rightBorder");
      }

      id("board").appendChild(tile);
    }
  }
}

function updatemove() {
  if (selectTile && selectnum) {
    selectTile.textContent = selectnum.textContent;

    let solution;
    if (id("difer1").checked) {
      solution = easy[1];
    } else if (id("difer2").checked) {
      solution = Medium[1];
    } else {solution = Hard[1];}

    const index = parseInt(selectTile.id);
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (selectTile.textContent === solution[row][col]) {
      selectTile.classList.remove("selected");
      selectnum.classList.remove("selected");
      selectTile = null;
      selectnum = null;
    } 
  }
}



function checkAllTiles() {
  let solution;

  if (id("difer1").checked) {
    solution = easy[1]; 
  } else if (id("difer2").checked) {
    solution = Medium[1]; 
  } else {
    solution = Hard[1];
  }

  const tiles = qsa(".tile");
  let foundError = false;
  let incomplete = false;

  tiles.forEach((tile, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (tile.textContent === "") {
      incomplete = true;  
    } else if (tile.textContent !== solution[row][col]) {
      foundError = true;
    }
  });

  const messageEl = id("message");

  if (incomplete || foundError) {
    if (level === "Hard") {
  if (lives > 0) {
    lives--;
  }
  if (lives <= 0) {
    lives = 0; 
    gameOver = true;
    disSelect = true;
    stopTimer(); 
    messageEl.style.color = "red";
    messageEl.textContent = "Game over! You've used all your lives.";
  } else {
    messageEl.style.color = "orange";
    messageEl.textContent = `There are errors or empty cells. You have ${lives} lives left.`;
  }

      id("lives").textContent = "Lives: " + lives;

      //hard no color
      tiles.forEach(tile => {
        tile.style.backgroundColor = "";
      });

    } else {
      // Easy/Medium
      tiles.forEach((tile, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;

        if (tile.textContent === "") {
          tile.style.backgroundColor = "";
        } else if (tile.textContent === solution[row][col]) {
          tile.style.backgroundColor = "lightgreen";
        } else {
          tile.style.backgroundColor = ""; //no show the error
        }
      });

      disSelect = false;
      messageEl.style.color = "orange";
      messageEl.textContent = "There are still incorrect or empty tiles. Keep trying!";
    }
  } else {
    // No errors and complete
    tiles.forEach(tile => {
      tile.style.backgroundColor = "lightgreen";
    });

    disSelect = true;
    messageEl.style.color = "green";
    messageEl.textContent = "Congratulations! All answers are correct.";
    stopTimer(); 
  }
}


function startTimer() {
  stopTimer(); 

  if (level === "Easy") {
    secondsElapsed = 0;
    id("timer").textContent = "Time: 00:00";

    timerInterval = setInterval(() => {
      secondsElapsed++;
      id("timer").textContent = `Time: ${formatTime(secondsElapsed)}`;

    }, 1000);

  } else if (level === "Medium") {
    secondsElapsed = 300; // 5 دقائق
    

id("timer").textContent = `Time Left: ${formatTime(secondsElapsed)}`;

    timerInterval = setInterval(() => {
      secondsElapsed--;
      id("timer").textContent = `Time Left: ${formatTime(secondsElapsed)}`;


      if (secondsElapsed <= 0) {
        clearInterval(timerInterval);
        gameOver = true;
        disSelect = true;
        id("message").style.color = "red";
        id("message").textContent = "Time's up! Game Over.";
      }
    }, 1000);

  } else if (level === "Hard") {
    secondsElapsed = 600; // 10 minte
    id("timer").textContent = `Time Left: ${formatTime(secondsElapsed)}`;


    timerInterval = setInterval(() => {
      secondsElapsed--;
      id("timer").textContent = `Time Left: ${formatTime(secondsElapsed)}`;


      if (secondsElapsed <= 0) {
        clearInterval(timerInterval);
        gameOver = true;
        disSelect = true;
        id("message").style.color = "red";
        id("message").textContent = "Time's up! Game Over.";
      }
    }, 1000);
  }
}


function stopTimer() {
  clearInterval(timerInterval);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
}


function clearPrev() {
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  for (let i = 0; i < 9; i++) {
    id("numbers-inserts").children[i].classList.remove("selected");
  }
  selectTile = null;
  selectnum = null;
}

id("resetBtn").addEventListener("click", function() {
  gameOver = false;
  disSelect = false;
  clearPrev();
lives = 3;
id("lives").textContent = "Lives: 3";

stopTimer();
  PlayGame();

  
  const messageEl = id("message");
  messageEl.textContent = "";
  messageEl.style.color = "black";
});


function id(id) {
  return document.getElementById(id);
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return document.querySelectorAll(selector);
}
