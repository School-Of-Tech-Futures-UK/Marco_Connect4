document.getElementById("header").innerText = "Connect 4"
let turn = 0
let player1 = "red"

// let gameObject = {
//     grid: [
//         [null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null],
//         [null, null, null, null, null, null, null]
//     ],
//     player1: "red",
//     turn: 0

// } 

let grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
]



function takeTurn(e) {
    const id = e.target.id
    const colNum = id[8]
    const rowNum = id[3]

    if (detectWinner(grid) === null){
        const lowestAvailableRow = getLowestAvailableRowInColumn(colNum, grid)
        console.log(`Lowest available row: ${lowestAvailableRow}`)

        if (lowestAvailableRow != null) {
            turn++

            if (player1 === "red") {
                grid[lowestAvailableRow][colNum] = "red"
                document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'red';
                player1 = "yellow"

            } 
            
            else {
                grid[lowestAvailableRow][colNum] = "yellow"
                document.getElementById(`row${lowestAvailableRow}-col${colNum}`).style.backgroundColor = 'yellow';
                player1 = "red"
            }
        }

        console.log(`You clicked column ${colNum}`)
        console.log(`Turn number ${turn}`)
        console.log(grid)
    }

    if (detectWinner(grid) != null){
        console.log(`winner is: ${detectWinner(grid)}`)
        resetGame()
    }
}


function getLowestAvailableRowInColumn(cynthiaColumnNumber, myGridSoItIs) {
    for (let i = 5; i >= 0; i--) {
        if (myGridSoItIs[i][cynthiaColumnNumber] === null) {
            return i
        }
    }

    return null;
}

function handleReset(){
    resetGame();
    resetBoard()
}

function resetGame(){
    //document.getElementById(`resetButton`).onclick
    console.log("game is reset")

    grid = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
    ]

    for(let i of document.getElementsByClassName("col")){
        //i.style.backgroundColor = "white"
        i.style.removeProperty('background-color');
    }
    
    turn = 0;
    player1 = "red"
}



function detectWinner(grid){

    if(checkRows(grid) != null){
        return checkRows(grid)
    }

    if(checkCols(grid) != null){
        return checkCols(grid)
    }
    
    if(checkForwardDiag(grid) != null){
        return checkForwardDiag(grid)
    }
    
    if(checkBackwardDiag(grid) != null){
        return checkBackwardDiag(grid)
    }
    

    return null;
        

}

function checkRows(grid){
     
    let rowCount

    for(let i = 0; i <= (grid.length - 1); i++){
        rowCount=0;

        for(let j = 0; j <= (grid[i].length -1); j++){
                        
            if(grid[i][j] === grid[i][j+1] && grid[i][j] != null){
                rowCount++;

                if(rowCount >= 3){
                    return grid[i][j]
                    
                }
            }
            
        }
        
    }

    return null;
}

function checkCols(grid){

    let colCount
    //for(k = 0; k < (grid[k].length - 1); k++){
    for(let k in grid[0]){
        colCount = 0;

        for(i = 0; i< (grid.length - 1); i++){
            if(grid[i][k] === grid[i+1][k] && grid[i][k] != null){
                colCount++;
        
                if(colCount >= 3){
                    return grid[i][k]
                }
            }
        }
        
    }

    return null;
    
}

function checkForwardDiag(grid){

    for(let fn = 3; fn <= 5; fn++){
        for(let fm = 0; fm <= 3; fm++){

            if(grid[fn][fm] === grid[fn-1][fm+1] && grid[fn][fm] === grid[fn-2][fm+2] && grid[fn][fm] === grid[fn-3][fm+3]
                && grid[fn][fm] != null){
                return grid[fn][fm]
            }
            
        } 
    }

    return null;
}

function checkBackwardDiag(grid){

    for(let bn = 3; bn <= 5; bn++){
        for(let bm = 3; bm <= 6; bm++){

            if(grid[bn][bm] === grid[bn-1][bm-1] && grid[bn][bm] === grid[bn-2][bm-2] && grid[bn][bm] === grid[bn-3][bm-3]
                && grid[bn][bm] != null){
                return grid[bn][bm]
            }
            
        }
    }

    return null;

}
