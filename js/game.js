/*-------------------------------- Constants --------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("play");
  const levelSelect = document.getElementById("level");

  if (playButton && levelSelect) {
    playButton.addEventListener("click", function () {
      const level = levelSelect.value;

      if (!level) {
        alert("Please select a level before continuing.");
        return;
      }

      localStorage.setItem("level", level);
      window.location.href = "play.html";
    });
  }})
/*---------------------------- Variables (state) ----------------------------*/

 
const easy = [["----9-7-33-67-5-1-1---3--9-4--3-8--2---4-918--2-----74---98----83--576------1-8--"]]


let selectnum,selectTile;
let usedNumbers, disSelect ;
/*-------------------------------- Functions --------------------------------*/

window.onload = function(){
 id("start").addEventListener("click",PlayGame)
}
function PlayGame(){
  let board
  if(id("easy").checked) board = easy[0] ;
  //88888
  disSelect = false;

  //55555
  generateBoard(board)
}

function generateBoard (board){
 clearPrev ()
 let counti = 0
 for(let i = 0; i < 81;i++){
  let tile = document.createElement("p")
  if (board[i]!= "-"){
    tile.textContent = board[i]
  } else {
     
  }
  tile.id = counti
  counti ++;
  tile.classList.add("tile")
  ///888 
  if ((tile.id>17 && tile.id < 27 )||(tile.id>44 && tile.id < 54 )){
    tile.classList.add("bottomBorder")
  }
  if ((tile.id +1)% 9 === 3 || (tile.id +1)% 9 === 6 )
    tile.classList.add("rightBorder")
 }
 id("board").appendChild(tile)
}

function clearPrev () {
  let tiles = qsa(".tile")
  for(let i=0;i < tiles.length ; i++){
    tiles[i].remove()
  }
  for(let i=0;i < id(".numbers-inserts").children.length ; i++){
    id("numbers-inserts").children[i].classList.remove("selected")
  }
  selectTile = null
  selectnum = null

}
function id(id){
  return document.getElementById(id)
}

