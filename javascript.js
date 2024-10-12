function GameController() {    
    const board = GameBoard() 
    const player = Players()
    const checkwin = checkWin()
    const result = document.querySelector("#results")
    const tiles = document.querySelectorAll(".place-tile")
    const gamestate = gameState()
    const button = document.querySelector("#start")

    let turn = 0

    button.addEventListener("click" , () => {
        if (player.checkPlayers()) {
            if (gamestate.getState() === null){
                gamestate.gameStart()
                button.textContent = 'Restart Game'
                result.textContent = player.getPlayer() + "'s turn"
            } else if (gamestate.getState() === "start") {
                
            } else {
                board.clearBoard()
                gamestate.gameStart()
                result.textContent = player.getPlayer() + "'s turn"
                turn = 0
            }
        } else {
            const input1 = document.getElementById("input1")
            const input2 = document.getElementById("input2")
            if (input1.value !== "" && input2.value !== ""){
                player.setPlayers(input1.value,input2.value)
                input1.value = ""
                input2.value = ""
                gamestate.gameStart()
                console.log(player.getPlayer())
                button.textContent = 'Restart Game'
                result.textContent = player.getPlayer() + "'s turn"
            }            
        }
    })

    for (let i = 0; i < tiles.length; i++){
            tiles[i].addEventListener("click", () => {
                if (gamestate.getState() === null){
                } else {
                    // set value if clicked
                    if (tiles[i].textContent === ""){
                        if (gamestate.getState() === "end"){
                        } else {
                            board.setValue(i,player.getPlayerPiece())
                            const checked = checkwin.check(board.getBoard(),player.getPlayerPiece())
                             if (checked === true) {
                                board.updateBoard()
                                result.textContent = player.getPlayer() + " Wins!"
                                gamestate.gameEnd()
                            } else if (turn === 8){
                                board.updateBoard()
                                result.textContent = "It's a TIE"
                                gamestate.gameEnd()
                            } else {
                                player.changePlayer()
                                board.updateBoard()
                                turn++
                            }
                        }
                    } else {
                        console.log("invalid move")
                    }
                }
            })
    }
}

function gameState() {
    let gameState = null

    const getState = () => gameState
    
    const gameStart = () => {
        gameState = "start"
    }

    const gameEnd = () => {
        gameState = "end"
    }

    return {
        gameStart,
        gameEnd,
        getState
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
    let players = {
        player1:"",
        player2:""
    }

    const result = document.querySelector("#results")
        
    let currentPlayer = players.player1

    const getPlayer = () => currentPlayer

    const getPlayerPiece = () => {
        if (currentPlayer === players.player1){
            return "X"
        } else {
            return "O"
        }
    }

    const changePlayer = () => {
        if (currentPlayer === players.player1) {
            currentPlayer = players.player2
            result.textContent = currentPlayer + "'s turn"
        } else {
            currentPlayer = players.player1
            result.textContent = currentPlayer + "'s turn"
        }
    }

    const setPlayers = (name1,name2) => {
        players = {
            player1:name1,
            player2:name2
        }
        currentPlayer = players.player1
    }

    const checkPlayers = () => {
        if (players.player1 === "" || players.player2 === "") {
            return false
        } else {
            return true
        }
    }

    return {
        getPlayer,
        changePlayer,
        setPlayers,
        checkPlayers,
        getPlayerPiece
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

    const clearBoard = () => {
        board = ["","","","","","","","",""]
        const tiles = document.querySelectorAll(".place-tile")
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].textContent = board[i]
        }
    }

    return {
        getBoard, 
        updateBoard,
        setValue,
        clearBoard
    }
}

const board = GameController()

