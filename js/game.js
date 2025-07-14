

/*-------------------------------- Constants --------------------------------*/

const easy = [
  ['-', '-', '-', '-', '9', '-', '7', '-', '3'],
  ['3', '-', '6', '7', '-', '5', '-', '1', '-'],
  ['1', '-', '-', '-', '3', '-', '-', '9', '-'],
  ['4', '-', '-', '3', '-', '8', '-', '-', '2'],
  ['-', '-', '-', '4', '-', '9', '1', '8', '-'],
  ['-', '2', '-', '-', '-', '-', '-', '7', '4'],
  ['-', '-', '-', '9', '8', '-', '-', '-', '-'],
  ['8', '3', '-', '-', '5', '7', '6', '-', '-'],
  ['-', '-', '-', '-', '1', '-', '8', '-', '-']
];
 
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


let selectnum, selectTile;
let disSelect, level;
let gameOver = false;

/*-------------------------------- Functions --------------------------------*/

window.onload = function() {
  id("Start").addEventListener("click", PlayGame);
  id("checkBtn").addEventListener("click", checkAllTiles);

  for (let num = 0; num < id("numbers-inserts").children.length; num++) {
    id("numbers-inserts").children[num].addEventListener("click", function() {
      if (!disSelect && !gameOver) {  // منع التعديل لو اللعبة مغلقة
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
  let board;

  if (id("difer1").checked) {
    board = easy;
    level = "easy";
  } else if (id("difer2").checked) {
    board = Medium[0];
    level = "Medium";
  }
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
          if (!disSelect && !gameOver) {  ////no change after close the game
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

      if (level === "Medium") {
        if ((row === 2 && col === 1) || (row === 3 && col === 1)) {
          tile.setAttribute("data-hint", "3 + ? = 12");
          tile.style.backgroundColor = "greenyellow";
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
      solution = easy;
    } else if (id("difer2").checked) {
      solution = Medium[1];
    }

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
  }

  const tiles = qsa(".tile");
  let foundError = false;
  let incomplete = false;

  tiles.forEach((tile, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;

    if (tile.textContent === "") {
      incomplete = true;  
      tile.style.backgroundColor = ""; 
    } else if (tile.textContent === solution[row][col]) {
      tile.style.backgroundColor = "lightgreen"; 
    } else {
      tile.style.backgroundColor = "lightcoral"; 
      foundError = true;
    }
  });

const messageEl = id("message");

if (incomplete) {
  disSelect = true;
  messageEl.style.color = "black";
  messageEl.textContent = "Please complete all the blocks.";
} else if (foundError) {
  gameOver = true;
  disSelect = true;
  messageEl.style.color = "red";
  messageEl.textContent = "There are errors! You must restart to try again.";
} else {
  disSelect = true;
  messageEl.style.color = "green";
  messageEl.textContent = "Congratulations! All answers are correct.";
}

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
