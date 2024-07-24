import GameRules from "./gameStates/pregame.js"
import Game from "./gameStates/game.js";
import './style.css';
import _ from 'lodash';
import ComputerPlayer from "./computerLogic/computerPlayer.js";

// game
const pregame = new GameRules()
pregame.ruleContainer()

let startbutton = document.querySelectorAll('button');
let player = null;
startbutton.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains("computer")) {
            player = "computer"
        }
        else {
            player = "player2"
        }
        pregame.removeRuleSet()
        const game = new Game("player1", `${player}`);
        game.startGame()
    })
})
// startbutton.addEventListener('click', () => {
//     pregame.removeRuleSet()
//     const game = new Game("player1", "computer");
//     game.startGame()
// })
