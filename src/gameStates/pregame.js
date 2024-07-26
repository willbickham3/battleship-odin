export default class GameRules{
    constructor() {
        this.main = document.querySelector("main")
    }

    ruleContainer() {
        const main = this.main
        const rules = this.appendRuleSet()
        console.log("append")
        main.append(rules)

    }

    createRule(message, HTMLelement) {
        let ruleP = document.createElement(HTMLelement);
        ruleP.innerText = message
        return ruleP
    }

    appendRuleSet() {
        const welcomeMessage = this.createRule(welcomeMsg, 'h1')
        const firstRule = this.createRule(ruleOne, 'p')
        const secondRule = this.createRule(ruleTwo, 'p')
        const thirdRule = this.createRule(ruleThree, 'p')
        const fourthRule = this.createRule(ruleFour, 'p')
        const fifthRule = this.createRule(ruleFive, 'p')
        const sixthRule = this.createRule(ruleSix, 'p')
        const startMessage = this.createRule(startMsg, 'p')

        const rules = document.createElement('article');
        rules.append(firstRule, secondRule, thirdRule, fourthRule, fifthRule, sixthRule);
        let container = document.createElement('section')
        container.classList.add('welcomeScreen')

        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add('buttonContainer')
        const pvpButton = this.startBtn('Player')
        const compButton = this.startBtn('Computer')
        buttonContainer.append(pvpButton, compButton)

        container.append(welcomeMessage, rules, startMessage, buttonContainer)
        return container
    }

    removeRuleSet() {
        this.main.removeChild(document.querySelector('.welcomeScreen'))
    }

    startBtn(string) {
        const startBtn = document.createElement('button');
        startBtn.innerText = `Start ${string} Game`
        startBtn.classList.add(`${string}`)
        return startBtn
    }


}

const welcomeMsg = "Greetings Admiral! Please see the rules for Battleship listed below."
const ruleOne = "1. You are given five ships to place. They are a Carrier, Battleship, Destroyer, Submarine, and Patrol Ship."
const ruleTwo = "2. You are able to place your ships anywhere on the map besides directly on top of one another."
const ruleThree = "3. You can change the orientation of your placement by pressing the R key on your keyboard."
const ruleFour = "4. If playing against a computer player your map is located on the left."
const ruleFive = "5. Ships are represented by their own sprites! Hits are pink and misses are white."
const ruleSix = "6. The first player to destroy all ships wins!"
const startMsg = "Press the button below to start the game and begin your assault."
