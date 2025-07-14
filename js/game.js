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
 
const Medium = [
  ['-', '-', '-', '-', '7', '-', '-', '3', '-'],
  ['-', '-', '-', '8', '-', '1', '-', '-', '-'],
  ['-', '3', '-', '-', '-', '9', '-', '-', '-'],
  ['-', '-', '-', '7', '6', '-', '1', '8', '-'],
  ['-', '1', '-', '-', '-', '-', '-', '7', '-'],
  ['3', '8', '-', '-', '1', '5', '-', '-', '-'],
  ['-', '6', '-', '2', '8', '4', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '9', '-'],
  ['-', '-', '-', '3', '9', '-', '2', '1', '8']
];


let selectnum,selectTile;
let  disSelect,level ;
/*-------------------------------- Functions --------------------------------*/

window.onload = function(){
 id("Start").addEventListener("click",PlayGame)

 for (let num = 0; num < id("numbers-inserts").children.length; num++) {
  id("numbers-inserts").children[num].addEventListener("click",function(){
    if (!disSelect) {
      if (this.classList.contains("selected")) {
        this.classList.remove("selected")
        selectnum = null
      } else{
        for (let nm = 0; nm < 9; nm++) {
          id("numbers-inserts").children[nm].classList.remove("selected")}
          this.classList.add("selected")
          selectnum=this;
          updatemove();
      }
    }
  })
  
  
 }
}
function PlayGame(){
  let board
 
  if(id("difer1").checked) {board = easy
      level = "easy";
  } 
  else if(id("difer2").checked) {
    board = Medium
      level = "Medium";
  
  } 
  disSelect = false;
  generateBoard(board)

  id("numbers-inserts").classList.remove("hidden")
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
        tile.addEventListener("click", function(){
          if(!disSelect){
           
          if (this.classList.contains("selected")) {
        this.classList.remove("selected")
        selectnum = null
      } else{
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
          qsa(".tile")[row][col].classList.remove("selected")}}
          this.classList.add("selected")
          selectnum=tile;
          updatemove();
      }
          }
        })
      }

      tile.id = counter;
      counter++;

      tile.classList.add("tile");
if (level === "Medium") {
  
  if((row === 2 && col === 1 )||(row === 3 && col === 1)){
    tile.setAttribute("data-hint", "3 + ? = 12")
  tile.style.backgroundColor = "greenyellow" ;
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

function updatemove(){
  if (selectTile && selectnum) {
    selectTile.textContent= selectnum.textContent
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
