import GameRules from "./pregame.js"
import Game from "./game.js";
import './style.css';
import _ from 'lodash';
import ComputerPlayer from "./computerPlayer.js";


// const player1 = new Player("player1")
// const computer = new Player('computer')

// player1.renderBoard()
// computer.renderBoard()
// player1.board.placeShip("Destroyer", 3, 5)
// player1.renderBoard()

// const compPlayer = new ComputerPlayer()
// console.log(compPlayer)
// let attack = compPlayer.removeAttackFromSet(0, 0)
// console.log(attack)
// let secondAttack = compPlayer.computerAttack()
// console.log(secondAttack)
// let Attack = compPlayer.computerAttack()
// console.log(Attack)
// Attack = compPlayer.computerAttack()
// console.log(Attack)
// Attack = compPlayer.computerAttack()
// console.log(Attack)

// game
const pregame = new GameRules()
pregame.ruleContainer()

let startbutton = document.querySelector('.startButton')
startbutton.addEventListener('click', () => {
    pregame.removeRuleSet()
    const game = new Game("player1", "computer");
    game.startGame()
})

// const game = new Game("player1", "computer");
// game.startGame()

// const game = new Game("Me", "Computer")
// game.startGame()