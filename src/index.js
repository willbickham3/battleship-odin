import GameRules from "./gameStates/pregame.js"
import Game from "./gameStates/game.js";
import './style.css';
import _ from 'lodash';
import ComputerPlayer from "./computerLogic/computerPlayer.js";
import Player from "./gameLogic/player.js";
import theme from "./audio/pregameAudio.js";
import menuMusic from "./audio/pregameAudio.js";
import Header from "./htmlAssets/header.js";

// waves pregame music
menuMusic.audioFile.setAttribute('id', 'menuMusic')
menuMusic.audioFile.loop = true;


// game
const header = new Header();
document.querySelector('header').append(header.createSettingsDropdown());

const soundBtnContainer = menuMusic.appendAudio();
document.querySelector('.soundSettings').append(soundBtnContainer, menuMusic.audioFile);

const pregame = new GameRules()
pregame.ruleContainer()


menuMusic.audioFile.volume = 0.20
menuMusic.play()
const player1    = new Player('player1')
const compPlayer = new Player('computer')
let startbutton = document.querySelectorAll('.welcomeScreen button');
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
