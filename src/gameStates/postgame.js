import Game from "./game";
import GameRules from "./pregame";

export default class postGame {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
    }

    createContainer() {
        console.log(this.winner())
        const main = document.querySelector('main');
        const postGameScreen = document.createElement('section');
        postGameScreen.classList.add('postGame')
        const postGameSummary = document.createElement('h2');
        postGameSummary.classList.add('postGameSummary');
        postGameSummary.innerText = `The winner is ${this.winner()}!`

        const scoreboardContainer = document.createElement('section');
        scoreboardContainer.classList.add('scoreboardContainer');
        let player1Scoreboard = this.createScoreBoard(this.player1)
        let player2Scoreboard = this.createScoreBoard(this.player2)
        let postGameButtons = this.postGameButtons()

        scoreboardContainer.append(player1Scoreboard, player2Scoreboard);
        
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        postGameScreen.append(postGameSummary, scoreboardContainer, postGameButtons)
        main.append(postGameScreen)
        return main
    }

    createScoreBoard(player) {
        const playerHeader = document.createElement('h3');
        playerHeader.classList.add(`${player.name}`);
        playerHeader.classList.add('stats');

        let opponent = null;
        let playerName = null;
        if (player == this.player1) {
            playerName = 'Player 1'
            opponent = this.player2
        }
        else {
            if (this.player2.name = 'computer') {
                playerName = 'Computer'
            }
            else {
                playerName = 'Player 2'
            }
            opponent = this.player1
        }

        playerHeader.innerText = `${playerName} Stats`
        const shots = opponent.board.shots.length;
        const misses = opponent.board.missedShots.length;

        const playerScoreboard = document.createElement('section');
        playerScoreboard.classList.add(`scoreboard`);
        playerScoreboard.classList.add(`${player.name}`)

        const playerShots = document.createElement('div');
        playerShots.classList.add('attackSummary');
        playerShots.innerText = `${playerName} shot ${shots} times and missed ${misses} times!`;

        const playerAccuracy = `${Math.floor((player.board.missedShots.length / player.board.shots.length) * 100)}%`;
        const accuracyMessage = `${playerName} Accuracy : ${playerAccuracy}`;
        const accuracyDiv = document.createElement('div');
        accuracyDiv.innerText = accuracyMessage

        playerScoreboard.append(playerHeader, playerShots, accuracyDiv)
        return playerScoreboard
    }

    postGameButtons() {
        const retryBtn = document.createElement('button');
        retryBtn.innerText = "Play Again"
        retryBtn.addEventListener('click', () => {
            const restart = this.resetGame()
            restart.startGame()
        })
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('buttonContainer')
        const returnBtn = document.createElement('button');
        returnBtn.innerText = "Return to Rules"
        returnBtn.addEventListener('click', () => {
            this.resetGame()
            const preGame = new GameRules()
            preGame.ruleContainer()
            let startbutton = document.querySelectorAll('.welcomeScreen button');
            let player = null;
            startbutton.forEach((button) => {
                button.addEventListener('click', () => {
                    player = player.name
                    preGame.removeRuleSet()
                    const game = new Game("player1", `${player}`);
                    game.startGame()
                })
            })
        })
        btnContainer.append(retryBtn, returnBtn)
        return btnContainer
    }

    winner() {
        if (this.player1.board.gameOver()) {
            this.gameWinner = "Computer"
            return this.gameWinner
        }
        else {
            this.gameWinner = "Player 1"
            return this.gameWinner
        }
    }

    createDiv(message) {
        const div = document.createElement('div');
        div.innerText = message
        return div
    }

    // reset game
    resetGame() {
        const parentElement = document.querySelector('.postGame').parentElement;
        parentElement.removeChild(parentElement.firstChild)
        const newGame = new Game(this.player1.name, this.player2.name)
        return newGame
    }

}