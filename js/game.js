/*-------------------------------- Constants --------------------------------*/

// const playButton = document.getElementById("play");

// playButton.addEventListener("click", function () {
//   window.location.href = "play.html";
// });


/*---------------------------- Variables (state) ----------------------------*/

 
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



let selectnum,selectTile;
let  disSelect ;
/*-------------------------------- Functions --------------------------------*/

window.onload = function(){
 id("Start").addEventListener("click",PlayGame)
}
function PlayGame(){
  let board
  if(id("difer1").checked) board = easy ;
  disSelect = false;
  generateBoard(board)
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
      }

      tile.id = counter;
      counter++;

      tile.classList.add("tile");

      
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




function clearPrev () {
  let tiles = qsa(".tile")
  for(let i=0;i < tiles.length ; i++){
    tiles[i].remove()
  }
  for(let i=0;i < 9 ; i++){
    id("numbers-inserts").children[i].classList.remove("selected")
  }
  selectTile = null
  selectnum = null
}


function id(id){
  return document.getElementById(id);
}

function qs(selector){
return document.querySelector(selector)
}

function qsa(selector){
  return document.querySelectorAll(selector)
}
