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
        const newDiv = this.createDiv(`The winner is ${this.winner()}!`)

        const player1shots = this.player1.board.shots.length
        const player1miss = this.player1.board.miss
        const player2shots = this.player2.board.shots.length
        const player2miss = this.player2.board.miss

        const retryBtn = document.createElement('button');
        retryBtn.innerText = "Play Again"
        retryBtn.addEventListener('click', () => {
            const restart = this.resetGame()
            restart.startGame()
        })

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
                    if (button.classList.contains("Computer")) {
                        player = "computer"
                    }
                    else {
                        player = "player2"
                    }
                    preGame.removeRuleSet()
                    const game = new Game("player1", `${player}`);
                    game.startGame()
    })
})
        })
        console.log(this.player1, this.player2)
        const player1Acc = this.createDiv(`Player 1 shot ${player2shots} times and missed ${player2miss} times.`)
        const player2Acc = this.createDiv(`Player 2 shot ${player1shots} times and missed ${player1miss} times.`)
        while (main.firstChild) {
            main.removeChild(main.firstChild)
        }
        postGameScreen.append(newDiv, player1Acc, player2Acc, retryBtn, returnBtn)
        main.append(postGameScreen)
        return main
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