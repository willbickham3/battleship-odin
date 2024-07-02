import GameBoard from "./gameboard.js";

export default class Player {
    constructor(name) {
        this.name = name
        this.board = new GameBoard()
        this.DOMboard = this.createBoard(this.board.gameBoard)
    }

    createBoard(board) {
        let gameContainer = document.createElement("div")
        gameContainer.classList.add(`game-container`)
        gameContainer.classList.add(`${this.name}`)
        let x = 0
        board.forEach((row) => {
            let y = 0
            let rowDiv = document.createElement("div")
            rowDiv.classList.add("row")

            row.forEach((square) => {
                let gameSquare = document.createElement("div")
                gameSquare.classList.add("square")

                if (square[0] !== null) {
                    gameSquare.classList.add("ship")
                }
                gameSquare.setAttribute('x', x)
                gameSquare.setAttribute('y', y)
                rowDiv.append(gameSquare)  //
                y += 1
            })
            gameContainer.append(rowDiv)   //
            x += 1
        })
        return gameContainer
    }

    appendParentContainer(name) {
        let container = document.createElement('div');
        container.classList.add(`${name}`)
        return container
    }

    renderBoard() {
        this.DOMboard = this.createBoard(this.board.gameBoard)
        let gameContainer = document.querySelector(`.game-container.${this.name}`)
        let main = document.querySelector(".root")

        if (!gameContainer) {
            let parentContainer = this.appendParentContainer(this.name)
            parentContainer.append(this.DOMboard)
            main.append(parentContainer)
        }

        // console.log(gameContainer)
        else {
            let parentElement = gameContainer.parentElement
            parentElement.removeChild(gameContainer)
            parentElement.append(this.DOMboard)
        }

        // main.append(this.DOMboard)
    }

    // attack() {

    // }
}