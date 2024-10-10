const players = {
    player1:"X",
    player2:"O"
}

let gameboard = {
    tile0:"",
    tile1:"",
    tile2:"",
    tile3:"",
    tile4:"",
    tile5:"",
    tile6:"",
    tile7:"",
    tile8:"",
}

let winningCombinations = [
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6]
]

playGame = (players) => {
    
    let currentPlayer = ""
    makeMove = (player,gameboard,tile) => {
        return gameboard[tile] = player
    }
    // current player switch
    for (let turn = 0; turn <= 9; turn++){
        if (turn % 2 === 0) {
            currentPlayer = players.player1
        } else {
            currentPlayer = players.player2
        }
        
        let tileMove = prompt("Next Move")
        makeMove(currentPlayer,gameboard,tileMove)
        console.log(gameboard)
    }   
}

playGame(players)

// createTiles = (gameboard) => {
//     const container = document.querySelector("#container")

//     for (let i = 0; i < 9; i++) {
//         const tile = document.createElement("div")
//         tile.classList.add("place-tile")
//         tile.id = "tile" + i
//         tile.addEventListener("click", () => {
//             gameboard[tile0] = "X"
//         })
//         container.appendChild(tile);
//     }
// }



// playGame = (players, gameboard) => {
//     let turn = 0
//     createTiles()
//     console.log(gameboard)

//     for (let i = 0; i <= winningCombinations.length; i++){
//         console.log(i)
//         turn++
//     }  
// }

// playGame(players, gameboard)




// checkBoard = (currentBoard) => {
//     for (win in winningCombinations) {
//         let winCopy = win
//         console.log(winCopy)
//         for (item in currentBoard) {
//             if (winCopy.includes(item)){
//                 const index = winCopy.indexOf(item)
//                 if (index !== -1) {
//                     winCopy.splice(index, 1);
//                     console.log(winCopy)
//                 }
//             }
//         }
//     }
// }


// checkBoard([0,3,6])

