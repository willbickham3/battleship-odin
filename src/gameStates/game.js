import ComputerPlayer from "../computerLogic/computerPlayer.js";
import Player from "../boardAssets/player.js";

export default class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        console.log(this.player2)
        this.currentPlayer = this.player1;
        this.opponent = this.player2;
        this.phase = "Placement"
        this.placement_orientation = 'vertical'
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

        if (this.player2.name == 'computer') {
            let computer = document.querySelector('.computer')
            this.player2.board.computerPlayer()
            computer.removeChild(computer.firstChild)
            this.player2.DOMboard.parentElement.prepend(this.player2.renderStatusBar())
        }

        this.addPlacementListeners(this.player1)
        // this.addPlacementListeners(this.player2)
}

    showTheShips(player) {
        const playerShipImages = player.DOMboard.querySelectorAll('.ship');
        playerShipImages.forEach((ship) => {
            ship.style.backgroundSize = "90% 100%";
        })
    }

    hideTheShips(player) {
        const playerShipImages = player.DOMboard.querySelectorAll('.ship');
        playerShipImages.forEach((ship) => {
            ship.style.backgroundSize = "0 0";
        })
    }

    showAShip(player) {

    }

    setShip(player, x, y) {
        let ships = player.board.getUnplacedShips()

        player.board.placeShip(ships[0].name, x, y, this.placement_orientation)
        this.currentPlayer.renderBoard()

        if (this.currentPlayer.board.ships.length == 5 && this.opponent.board.ships.length == 5) {
            console.log('change')
            this.phase = "Battle"
            this.changeTurn()}
        if (this.player2.name !== 'computer') {
            this.changeTurn()
        }
        this.addPlacementListeners(this.currentPlayer)  // currentPlayer is now pointing to the next ship
    }

    checkIfValidShot(x, y) {
        let valid = true;
        let board = this.currentPlayer.board;
        
        let shots = board.shots
        
        for (let coordinate of shots) {
            if (coordinate[0] == x && coordinate[1] == y) {valid = false; break}
        }

        return valid
    }

    registerAttackOnDOM(player, x, y) {
        let hitship = player.DOMboard.querySelector(`[x="${x}"][y="${y}"]`)
        if (!hitship) {return}
        if (hitship.classList.contains('hit')) {
            return 
        }

        if (player.board.receiveAttack(x, y)) {
            hitship.classList.add("hit")
            let ship = player.board.gameBoard[x][y]
            let shipName = player.board.gameBoard[x][y].name
            if (ship.sunk) {let statusBar = document.querySelector(`.${player.name}`)
            statusBar.querySelector(`.${shipName}`).style.backgroundColor = "red"}
            return true
        }
        else {
            hitship.style.backgroundColor = "white"
            return false
        }
        }

    clickEvent = (ev) => {
        let x = Number(ev.target.getAttribute('x'));
        let y = Number(ev.target.getAttribute('y'));

        let currentShip = this.currentPlayer.board.getUnplacedShips()
        let shipLength = null
        if (currentShip.length !== 0) {shipLength = currentShip[0].length}
        let board       = this.currentPlayer.board
        let orientation = this.placement_orientation

        if (this.phase == "Placement") {
            if (!board.spotCheck(shipLength, x, y, orientation)) {
                return
            }
            this.setShip(this.currentPlayer, x, y)
        }

        else {
            if (!this.checkIfValidShot(x, y)) {console.log("BadSHOT");
                return}
            this.registerAttackOnDOM(this.currentPlayer, x, y)
            if (this.player2.board.gameOver()) {
                this.removeEventListeners(this.player1)
                this.removeEventListeners(this.player2)
                console.log("play again?")
                confirm("Play again?")
            }
            if (this.player2.name !== 'computer') {
            this.removeEventListeners(this.currentPlayer)
            this.changeTurn()
            this.addPlacementListeners(this.currentPlayer)}
            else {
                this.changeTurn()
                let enemyShip = null
                let [x, y] = this.player2.board.computerAttack()
                if (this.registerAttackOnDOM(this.player1, x, y)) {
                    enemyShip = this.player1.board.gameBoard[x][y]
                    console.log(enemyShip)
                    this.player2.board.setPrevAttackAndPrevHit(enemyShip, x, y)
                }
                else {
                    console.log(enemyShip)
                    if (enemyShip !== null && enemyShip.isSunk()) {
                    this.player2.board.unsetPrevAttackAndPrevHit()}
                }
                
                this.changeTurn()
            }
            if (this.player2.board.gameOver()) {
                this.removeEventListeners(this.player2)
                console.log("play again?")
                confirm("Play again?")

                alert("Game Over. Please reload the page.")
            }
        }
    }
    removeShiny() {
        let shinySquares = document.querySelectorAll('.shiny')
        let ships = this.currentPlayer.board.unplacedShips
        console.log(shinySquares)
        shinySquares.forEach((square) => {
            square.classList.remove('shiny')
        })

        let prev_x = Number(shinySquares[0].attributes.x.value)
        let prev_y = Number(shinySquares[0].attributes.y.value)
        if (this.placement_orientation == 'vertical') {
            for (let index = 0; index < ships[0].length; index++) {
                let newSquare = this.currentPlayer.DOMboard.querySelector(`[x="${prev_x}"][y="${prev_y + index}"]`);
                newSquare.classList.add('shiny');
            }
        }
        else {
            for (let index = 0; index < ships[0].length; index++) {
                let newSquare = this.currentPlayer.DOMboard.querySelector(`[x="${prev_x + index}"][y="${prev_y}"]`);
                newSquare.classList.add('shiny');
            }
        }
    }
    rotationEvent = (ev) => {
        console.log(ev)
        if (ev.key == 'r' || ev.code == 'KeyR') {
            this.placement_orientation = this.placement_orientation === 'vertical' ? 'horizontal' : 'vertical';
            this.removeShiny()
        }
        console.log(this.placement_orientation)
        return this.placement_orientation
    }

    mouseOverEvent = (ev) => {
        let x = Number(ev.target.getAttribute('x'));
        let y = Number(ev.target.getAttribute('y'));
        let ships = this.currentPlayer.board.unplacedShips

        if (this.phase == "Placement") {
            for (let index = 0; index < ships[0].length; index++) {
                let colorSquare = this.placement_orientation === 'vertical' 
                ? this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y + index}"]`)
                : this.currentPlayer.DOMboard.querySelector(`[x="${x + index}"][y="${y}"]`)
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
                let colorSquare = this.placement_orientation === 'vertical' 
                ? this.currentPlayer.DOMboard.querySelector(`[x="${x}"][y="${y + index}"]`)
                : this.currentPlayer.DOMboard.querySelector(`[x="${x + index}"][y="${y}"]`)
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
        window.addEventListener('keydown', this.rotationEvent)
    }

    removeEventListeners(player) {
        const squares = document.querySelectorAll(`.game-container.${player.name} .square`);
        squares.forEach((square) => {
            square.removeEventListener("mouseover", this.mouseOverEvent)
            square.removeEventListener("mouseout", this.mouseOutEvent)
            square.removeEventListener('click', this.clickEvent)
        })
        window.removeEventListener('keydown', this.rotationEvent)

    }

}


 