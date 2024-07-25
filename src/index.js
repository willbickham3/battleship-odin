import GameRules from "./gameStates/pregame.js"
import Game from "./gameStates/game.js";
import './style.css';
import _ from 'lodash';
import ComputerPlayer from "./computerLogic/computerPlayer.js";
import Player from "./boardAssets/player.js";

// game
const pregame = new GameRules()
pregame.ruleContainer()

const player1    = new Player('player1')
const compPlayer = new Player('computer')

let startbutton = document.querySelectorAll('button');
let player = null;
startbutton.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains("Computer")) {
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
