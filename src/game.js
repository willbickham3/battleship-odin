import Player from "./player.js";

export default class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.currentPlayer = this.player1;
        this.opponent = this.player2;
        this.phase = "Placement"
    }

    changeTurn() {
        // if (this.opponent.board.unplacedShips.length == 0) {
        //     return "Start"
        // }
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1
        this.opponent = this.opponent === this.player1 ? this.player2 : this.player1

        // if (this.currentPlayer.name == 'computer') {
        //     this.computerPlayer()
        // }
    }

    highlightBoard() {
        this.currentPlayer.DOMboard
    }

    startGame() {

        this.player1.renderBoard()
        this.player2.renderBoard()

        this.addPlacementListeners(this.player1)
        // this.addPlacementListeners(this.player2)
}

    setShip(player, x, y) {
        let ships = player.board.unplacedShips
        player.board.placeShip(ships[0].name, x, y)
        // console.log(this.currentPlayer.board, ships)
        this.currentPlayer.renderBoard()
        this.changeTurn()
        this.addPlacementListeners(this.currentPlayer)  // currentPlayer is now pointing to the next ship
    }

    computerPlayer() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        if (this.setShip(this.currentPlayer, x, y)) {
            console.log('success')
            this.changeTurn()
            this.addPlacementListeners(this.currentPlayer)
            return 
        }
        else {
            this.computerPlayer()
        }
        
    }

    attackShip(player, x, y) {
        console.log('player')
        player.board.receiveAttack(x, y)
    }

    clickEvent = (ev) => {
        // console.log(this.phase)
        let x = Number(ev.target.getAttribute('x'));
        let y = Number(ev.target.getAttribute('y'));
        if (this.phase == "Placement") {
            if (this.currentPlayer.name == this.player1.name) {
                this.setShip(this.player1, x, y)
                // console.log(this.player1.board.gameOver())
            }
            else {
                this.setShip(this.player2, x, y)}
                // console.log(this.player2.board.gameOver())
        }

        else {
            console.log("Here #2")
            let hitship = this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y}"]`)
            if (hitship.classList.contains('hit')) {
                return 
            }

            if (this.currentPlayer.board.receiveAttack(x, y)) {
                console.log(hitship)
                hitship.classList.add("hit")
            }
            else {
                hitship.style.backgroundColor = "white"
            }
            hitship.classList.remove("shiny")
            console.log(this.currentPlayer.board)
            // this.currentPlayer.renderBoard()
            // hitship.classList.add('hit')
            this.removeEventListeners(this.currentPlayer)
            this.changeTurn()
            this.addPlacementListeners(this.currentPlayer)
        }
    }

    mouseOverEvent = (ev) => {
        let x = Number(ev.target.getAttribute('x'));
        let y = Number(ev.target.getAttribute('y'));
        let ships = this.currentPlayer.board.unplacedShips

        if (this.phase == "Placement") {
            for (let index = 0; index < ships[0].length; index++) {
                let colorSquare = this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y + index}"]`)
                colorSquare.classList.add("shiny")
            }}
        else {
            let colorSquare = this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y}"]`)
            colorSquare.classList.add("shiny")
        }
    }

    mouseOutEvent = (e) => {
        let x = Number(e.target.getAttribute('x'));
        let y = Number(e.target.getAttribute('y'));
        let ships = this.currentPlayer.board.unplacedShips
        if (this.phase == "Placement") {
            for (let index = 0; index < ships[0].length; index++) {
                let colorSquare = this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y + index}"]`)
                colorSquare.classList.remove("shiny")
            }}
        else {
            let colorSquare = this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y}"]`)
            colorSquare.classList.remove("shiny")
        }
    }

    addPlacementListeners(player) {
        let ships = this.currentPlayer.board.unplacedShips

        if (ships.length == 0) {
            console.log("Game Start")
            this.phase = "Battle"
            console.log(this.currentPlayer, this.opponent, this.currentPlayer.board.gameBoard[0][0])
        }

        const squares = document.querySelectorAll(`.game-container.${player.name} .square`)

        squares.forEach((square) => {
            square.addEventListener("mouseover", this.mouseOverEvent)
            square.addEventListener("mouseout", this.mouseOutEvent)
            square.addEventListener('click', this.clickEvent)
        })
    }

    removeEventListeners(player) {
        const squares = document.querySelectorAll(`.game-container.${player.name} .square`);
        squares.forEach((square) => {
            square.removeEventListener("mouseover", this.mouseOverEvent)
            square.removeEventListener("mouseout", this.mouseOutEvent)
            square.removeEventListener('click', this.clickEvent)
        })

    }

}


 