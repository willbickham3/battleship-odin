import GameBoard from "./gameboard.js"
import Ship from "../ship.js"
import Player from "./player.js";
import Game from "./game.js";


// const player1 = new Player("player1")
// const computer = new Player('computer')

// player1.renderBoard()
// computer.renderBoard()
// player1.board.placeShip("Destroyer", 3, 5)
// player1.renderBoard()

const game = new Game("player1", "computer");
game.startGame()

// const game = new Game("Me", "Computer")
// game.startGame()