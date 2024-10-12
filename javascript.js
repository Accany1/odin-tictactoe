function GameController() {    
    const board = GameBoard() 
    const player = Players()
    const checkwin = checkWin()
    const result = document.querySelector("#results")

    const tiles = document.querySelectorAll(".place-tile")
    for (let i = 0; i < tiles.length; i++){
        tiles[i].addEventListener("click", () => {
        
            // set value if clicked
            if (tiles[i].textContent === ""){
                board.setValue(i,player.getPlayer())
                const checked = checkwin.check(board.getBoard(),player.getPlayer())
                if (checked === true) {
                    result.textContent = player.getPlayer() + " Wins!"
                    board.updateBoard()
                } else {
                    player.changePlayer()
                    board.updateBoard()
                }
            } else {
                console.log("invalid move")
            }
        })
    }

}

function checkWin(){
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

    const check = (gameboard, selectedPlayer) => {


        for(let i = 0; i< winningCombinations.length ;i++) {
            for(let n = 0; n<= 3 ;n++) {
                if (n === 3) {
                    console.log("YOU WIN")
                    return true
                }
                const selected = winningCombinations[i][n]
                if (gameboard[selected] === selectedPlayer){
                    continue
                } else {
                    break
                }
            }
        }

        return false
    }

    return {check}
}

// console.log(checkWin(gameboard,"X"))

// playGame(players)

function Players() {
    const players = {
        player1:"X",
        player2:"O"
    }

    const result = document.querySelector("#results")
        
    let currentPlayer = players.player1

    const getPlayer = () => currentPlayer

    const changePlayer = () => {
        if (currentPlayer === players.player1) {
            currentPlayer = players.player2
            result.textContent = currentPlayer + "'s turn"
        } else {
            currentPlayer = players.player1
            result.textContent = currentPlayer + "'s turn"
        }
    }

    return {
        getPlayer,
        changePlayer
    }
}

function GameBoard() {
    let board = ["","","","","","","","",""]

    const container = document.querySelector("#container")
    

    // board creation 9 tiles
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement("div")
        tile.classList.add("place-tile")
        tile.id = "tile" + i
        container.appendChild(tile);
    }
    
    // get the gameBoard
    const getBoard = () => board

    const setValue = (pos,player) => {
        board[pos] = player
    }

    //gets the board list and updates the board
    const updateBoard = () => {
        const tiles = document.querySelectorAll(".place-tile")
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].textContent = board[i]
        }
    }

    return {
        getBoard, 
        updateBoard,
        setValue
    }
}



const board = GameController()

