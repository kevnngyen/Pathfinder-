
const submit = document.getElementById("submit");
const maze = document.getElementById("maze");
const dimension = document.getElementById('dimension');
const solve = document.getElementById('solve')
var start = false;
var startCoordinates; // will be an array, [0] is the row, [1] is the col
var exit = false;
var mazeArr;
var direction = ""


//SOLVES THE MAZE
function solveMazeArr(startRow, startCol, mazeArr){

  // disable the cells to non clickable
  for(r in mazeArr){
    for(c in mazeArr[r]){

      const cell_id = 'r'+ r +'c'+ c;
      document.getElementById(cell_id).style.cursor = "default";
      document.getElementById(cell_id).onclick = null;

    }
  }

  const pathArr = [];
  let solution
  solution = traverse(startRow, startCol, 'left', pathArr, mazeArr)// direction doesn't matter here
  console.log(solution)

  if(solution == null){
    alert('no solution is found')
    console.log('no solution is found')
  }
  else{
    for(e in solution){

      if(e == 0){
        continue
      }
  
      const pair= solution[e].split(',')
      console.log(pair)
      /* Starts to mark down the path to take */
      let changeCell_id = 'r'+pair[0]+'c'+pair[1];
      setTimeout(function(){
        let changeCell = document.getElementById(changeCell_id)
        changeCell.style.backgroundColor = "#ff53eb"
      },200 * e)

  
    }

  }
  
}
//SOLVES THE MAZE TRAVERSAL(PATH)
function traverse(r, c, direction, pathArr, mazeArrCopy) {

  // Check if the exit has been found
  if (mazeArrCopy[r][c] === 3) {
  
    console.log(`Exit found at ${r},${c}`);
    for (let i = 0; i < pathArr.length; i++) {
      console.log(pathArr[i]);
    }
    console.log(mazeArrCopy);
    return true;
  }

  // Convert the current cell coordinates to a string for path tracking
  const currentCell = `${r},${c}`;

  // Check if the current cell is already in the path
  if (!pathArr.includes(currentCell)) {
    // Add the current cell to the path
    pathArr.push(currentCell);

    // Attempt to move in all four directions
    const directions = ['left', 'up', 'down', 'right'];

    for (const newDirection of directions) {
      let newRow = r;
      let newCol = c;

      // Update the new coordinates based on the new direction
      if (newDirection === 'left') {
        newCol--;
      } else if (newDirection === 'up') {
        newRow--;
      } else if (newDirection === 'down') {
        newRow++;
      } else if (newDirection === 'right') {
        newCol++;
      }

      // Check if the new coordinates are within bounds and not blocked
      if (
        newRow >= 0 &&
        newRow < mazeArrCopy.length &&
        newCol >= 0 &&
        newCol < mazeArrCopy[newRow].length &&
        mazeArrCopy[newRow][newCol] !== 1
      ) {
        // Recursively traverse the new path
        if (traverse(newRow, newCol, newDirection, pathArr, mazeArrCopy)) {
          return pathArr; // Return the path is found in any direction
        }
      }
    }

    // If all directions were explored and no exit found, backtrack by removing the current cell from the path
    pathArr.pop();
  }

}

//creates the Maze Array by labelling everying 1
function createMazeArr(dimension) { 

	let array = []

  for (let i = 0; i < dimension; i++){
    array[i]=[];
    for(let j = 0; j < dimension; j++){
      array[i][j]=1;
    }
  }

  console.log(array)
  console.log("----INTIALIZATION----")
	return array;  
} 

solve.addEventListener('click', function(){

  solveMazeArr(parseInt(startCoordinates[0]), parseInt(startCoordinates[1]), mazeArr)

  console.log("finish")

})

//0 means it is a path
//1 and red means it's barracaded
//2 and green means it is the beginning
//3 and purpl means it is the exit
submit.addEventListener('click', e=>{

  var start = false;
  var exit = false;
  mazeArr = createMazeArr(dimension.value);

  maze.replaceChildren();//erases the current existent maze and creates new layout

  for(let i = 0; i< (dimension.value); i++){
    let newRow = document.createElement("row");
    newRow.id = "row" + i;

    maze.appendChild(newRow);

    for(let j = 0; j < (dimension.value); j++){
      let newCell = document.createElement("cell");
      newCell.className = "cell"
      newCell.id = 'r'+i+'c'+j;
      newCell.value = 1;
      newCell.setAttribute('row', i);
      newCell.setAttribute('col', j);

      newCell.onclick = function(){
        var element = document.getElementById(this.id)
        if(this.value == 1){
          element.style.backgroundColor = "#fff953"
          newCell.value = 0;//barracade the cell

          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 0;
          console.log(mazeArr)
          console.log("----CHANGE----")
          
        }
        else if( this.value == 0 && (start == false) ){
          element.style.backgroundColor = "#53ffa9"
          newCell.value = 2;
          start = true;//set to true so that we can't set another starting point

          startCoordinates = [this.getAttribute('row'), this.getAttribute('col')];
          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 2;
          console.log(startCoordinates)
          console.log(mazeArr)
          console.log("----CHANGE----")
        }
        else if( this.value == 0 && (exit == false) ){
          element.style.backgroundColor = "#9b53ff"
          newCell.value = 3;
          exit = true;//set to true so that we can't set another exit point

          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 3;
          console.log(mazeArr)
          console.log("----CHANGE----")
          
        }

        else if(this.value == 0){
          element.style.backgroundColor = ""
          newCell.value = 1;//close the cell

          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 1;
          console.log(mazeArr)
          console.log("----CHANGE----")
          
        }

        else if (this.value == 2){
          element.style.backgroundColor = "#fff953"
          newCell.value = 0;
          start = false;//set to false so that there is a starting point to be set
          startCoordinates = null;

          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 0;
          console.log(mazeArr)
          console.log("----CHANGE----")
        }

        else if (this.value == 3){
          element.style.backgroundColor = "#fff953"
          newCell.value = 0;
          exit = false;//set to false so that there is a exit point to be set

          mazeArr[this.getAttribute('row')][this.getAttribute('col')] = 0;
          console.log(mazeArr)
          console.log("----CHANGE----")
        }



      }
      
      newRow.appendChild(newCell);

    }

  }






})