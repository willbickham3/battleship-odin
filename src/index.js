import createMain from "./main.js";
import Game from "./game.js";
import './style.css';
import _ from 'lodash';


// const player1 = new Player("player1")
// const computer = new Player('computer')

// player1.renderBoard()
// computer.renderBoard()
// player1.board.placeShip("Destroyer", 3, 5)
// player1.renderBoard()
createMain()
const game = new Game("player1", "computer");
game.startGame()

// const game = new Game("Me", "Computer")
// game.startGame()