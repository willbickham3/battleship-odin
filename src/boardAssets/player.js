import ComputerPlayer from "../computerLogic/computerPlayer.js";
import GameBoard from "./gameboard.js";
import carrierImage from "../battleship-assets/Carrier/ShipCarrierHull.png";
import destroyerImage from "../battleship-assets/Destroyer/ShipDestroyerHull.png";
import battleshipImage from "../battleship-assets/Battleship/ShipBattleshipHull.png";
import submarineImage from "../battleship-assets/Submarine/ShipSubMarineHull.png";
import patrolBoatImage from "../battleship-assets/PatrolBoat/ShipPatrolBoatHull.png";

const shipsArray = [carrierImage, battleshipImage, destroyerImage, submarineImage, patrolBoatImage]

export default class Player {
    constructor(name) {
        this.name = name
        this.board = (name !== 'computer') ? new GameBoard() : new ComputerPlayer()
        this.DOMboard = this.createBoard(this.board.gameBoard)
    }

    createBoard(board) {
        let gameContainer = document.createElement("div")
        gameContainer.classList.add(`game-container`)
        gameContainer.classList.add(`${this.name}`)
        let x = 0
        board.forEach((row) => {
            let y = 0
            let rowDiv = document.createElement("div")
            rowDiv.classList.add("row")

            row.forEach((square) => {
                let gameSquare = document.createElement("div")
                gameSquare.classList.add("square")

                if (square[0] !== null) {
                    gameSquare.classList.add("ship")
                    
                    gameSquare.classList.add(`${square.name}`)
                    this.renderShipImagesOntoDom(gameSquare, square)
                }

                gameSquare.setAttribute('x', x)
                gameSquare.setAttribute('y', y)
                rowDiv.append(gameSquare)  //
                y += 1
            })
            gameContainer.append(rowDiv)   //
            x += 1
        })
        return gameContainer
    }

    updateDOM(x, y) {
        let element = this.DOMboard.querySelector(`[x="${x}"][y="${y}"]`)
        let ship = this.board
        console.log(ship)
        element.classList.add(`ship`)
        element.classList.add(`${ship.name}`)
        this.renderShipImagesOntoDom(element, ship)
    }

    appendParentContainer(name) {
        let container = document.createElement('div');
        container.classList.add(`${name}`)
        return container
    }

    renderShipImagesOntoDom(element, square) {
        let image_to_add = null;

        if (element.classList.contains('Carrier')) {
            image_to_add = carrier[carrierIndex];
            carrierIndex = (carrierIndex + 1) % carrier.length;
        }
        else if (element.classList.contains('Battleship')) {
            image_to_add = battleship[battleshipIndex];
            battleshipIndex = (battleshipIndex + 1) % battleship.length;
            
        }
        else if (element.classList.contains('Destroyer')) {
            image_to_add = destroyer[destroyerIndex];
            destroyerIndex = (destroyerIndex + 1) % destroyer.length;
        }
        else if (element.classList.contains('Submarine')) {
            image_to_add = submarine[submarineIndex];
            submarineIndex = (submarineIndex + 1) % submarine.length;
            
        }
        else if (element.classList.contains('PatrolBoat')) {
            image_to_add = patrolBoat[patrolBoatIndex];
            patrolBoatIndex = (patrolBoatIndex + 1) % patrolBoat.length;
        }

        if (image_to_add){
        element.style.backgroundImage = `url(${image_to_add})`;
        element.style.backgroundRepeat = "no-repeat";
        element.style.backgroundSize = "90% 100%";
        element.style.backgroundPosition = "center";
            if (square.rotation) {
                element.style.transform = "rotate(270deg)"
            }
        }
        return element
    }

    renderStatusBar() {
        const shipContainer = document.createElement("div");
        shipContainer.classList.add("statusBar")
        let x = 0
        for (let ship of this.board.ships) {
            let shipDiv = document.createElement('div');
            shipDiv.classList.add(`${ship.name}`)
            shipDiv.style.backgroundImage = `url(${shipsArray[x]})`
            shipDiv.style.backgroundRepeat = "no-repeat";
            shipDiv.style.backgroundSize = "contain";
            shipDiv.style.backgroundPosition = "center";
            shipContainer.append(shipDiv)
            x += 1
        }
        return shipContainer
    }

    renderBoard() {
        this.DOMboard = this.createBoard(this.board.gameBoard)
        let gameContainer = document.querySelector(`.game-container.${this.name}`)
        let main = document.querySelector(".root")
        let ship = this.renderStatusBar()
        let shipContainer = document.querySelector('.statusBar')

        if (!gameContainer) {
            let parentContainer = this.appendParentContainer(this.name)
            parentContainer.append(ship, this.DOMboard)
            main.append(parentContainer)
        }

        // console.log(gameContainer)
        else {
            let parentElement = gameContainer.parentElement
            let shipParent = shipContainer.parentElement
            console.log(shipParent, parentElement)
            while (parentElement.firstChild) {
                parentElement.removeChild(parentElement.firstChild)
            }
            // parentElement.removeChild(gameContainer)
            // shipParent.removeChild(shipContainer)
            parentElement.append(ship, this.DOMboard)
        }
        // main.append(this.DOMboard)
    }

    // attack() {

    // }
}

// carrier
const requireCarrier = require.context("../battleship-assets/Carrier/Pieces", false, /\.png$/);
const carrier = requireCarrier.keys().map(requireCarrier);
let carrierIndex = 0

// destroyer
const requireDestroyer = require.context("../battleship-assets/Destroyer/Pieces", false, /\.png$/);
const destroyer = requireDestroyer.keys().map(requireDestroyer);
let destroyerIndex = 0

// battleship
const requireBattleship = require.context("../battleship-assets/Battleship/Pieces", false, /\.png$/);
const battleship = requireBattleship.keys().map(requireBattleship);
let battleshipIndex = 0

// submarine
const requireSubmarine = require.context("../battleship-assets/Submarine/Pieces", false, /\.png$/);
const submarine = requireSubmarine.keys().map(requireSubmarine);
let submarineIndex = 0

// patrol boat
const requirePatrolBoat = require.context("../battleship-assets/PatrolBoat/Pieces", false, /\.png$/);
const patrolBoat = requirePatrolBoat.keys().map(requirePatrolBoat);
let patrolBoatIndex = 0