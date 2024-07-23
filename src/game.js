import ComputerPlayer from "./computerPlayer.js";
import Player from "./player.js";

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
            this.computerPlayer()
        }

        this.addPlacementListeners(this.player1)
        // this.addPlacementListeners(this.player2)
}

    setShip(player, x, y) {
        let ships = player.board.getUnplacedShips()

        player.board.placeShip(ships[0].name, x, y, this.placement_orientation)
        this.currentPlayer.renderBoard()
        // this.currentPlayer.updateDOM(x, y)
        console.log(this.currentPlayer.board.ships.length)
        if (this.currentPlayer.board.ships.length == 5 && this.opponent.board.ships.length == 5) {
            console.log('change')
            this.phase = "Battle"
            this.changeTurn()}

        this.addPlacementListeners(this.currentPlayer)  // currentPlayer is now pointing to the next ship
    }

    computerPlayer() {
        let computerBoard = this.player2.board;
        let [x, y] = this.generateRandomCoordinates();
        
        while (this.player2.board.unplacedShips.length > 0) {
            let computerShips = computerBoard.getUnplacedShips()
            let nextShip = computerShips[0]
            computerBoard.placeShip(nextShip.name, x, y, this.placement_orientation);
            [x, y] = this.generateRandomCoordinates();
        }
    }

    generateRandomCoordinates() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
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
            return true
        }
        else {
            hitship.style.backgroundColor = "white"
            return false
        }
        }

    clickEvent = (ev) => {
        // console.log(this.phase)
        let x = Number(ev.target.getAttribute('x'));
        let y = Number(ev.target.getAttribute('y'));
        if (this.phase == "Placement") {
            this.setShip(this.currentPlayer, x, y)
        }

        else {
            if (!this.checkIfValidShot(x, y)) {console.log("BadSHOT");
                return}
            this.registerAttackOnDOM(this.currentPlayer, x, y)
            // console.log(this.currentPlayer.board)
            // this.currentPlayer.renderBoard()
            // hitship.classList.add('hit')
            if (this.player2.name !== 'computer') {
            this.removeEventListeners(this.currentPlayer)
            this.changeTurn()
            this.addPlacementListeners(this.currentPlayer)}
            else {
                this.changeTurn()
                let [x, y] = this.player2.board.computerAttack()
                if (this.registerAttackOnDOM(this.player1, x, y)) {
                    this.player2.board.setPrevAttackAndPrevHit(x, y)
                }
                else {
                    this.player2.board.unsetPrevAttackAndPrevHit()
                }
                
                this.changeTurn()
            }
            if (this.player1.board.gameOver() || this.player2.board.gameOver()) {
                this.removeEventListeners(this.player2)

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


 