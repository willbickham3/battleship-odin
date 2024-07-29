import GameRules from "./gameStates/pregame.js"
import Game from "./gameStates/game.js";
import './style.css';
import _ from 'lodash';
import Player from "./gameLogic/player.js";
import Header from "./htmlAssets/header.js";
import AudioSetup from "./audio/audioSetup.js";
import stormSound from './audio/sounds/storm.mp3'
import wavesSound from './audio/sounds/waves.wav'

// waves pregame music
const menuMusic = new AudioSetup(wavesSound)
const stormAudio = new AudioSetup(stormSound)

menuMusic.audioFile.setAttribute('id', 'menuMusic')
menuMusic.audioFile.loop = true;

stormAudio.audioFile.setAttribute('id', 'stormAudio')
stormAudio.audioFile.loop = true;


// game
const header = new Header();
document.querySelector('header').append(header.createSettingsDropdown());

const soundBtnContainer = menuMusic.appendAudio();
document.querySelector('.soundSettings').append(soundBtnContainer, menuMusic.audioFile, stormAudio.audioFile);

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
