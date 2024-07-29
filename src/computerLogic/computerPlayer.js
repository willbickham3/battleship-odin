import { random } from "lodash";
import GameBoard from "../gameLogic/gameboard";

export default class ComputerPlayer extends GameBoard {
    constructor() {
        super();
        this.prevHitShip = null
        this.prevHit = null;
        this.prevAttackBool = false;
        this.attackSet = new Set(Array.from({ length: 10 }, (_, x) => Array.from({length: 10}, (_, y) => [x, y])).flat().map(coord => coord.join(',')));
        this.attackMatrix = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ];
        // this.attackMatrixCount = 0
        this.enemyRotation = null;
    }

    generateRandomCoordinates() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
    }

    computerAttack() {
        // let hitBool        = this.prevAttackBool
        let hitCoordinates = this.prevHit
        console.log(this.prevHit)
        // let prevHitCoordinates = this.prevHitShip[1]
        
        let x = null;
        let y = null;

        if (this.prevHitShip && this.prevHitShip.sunk) {
            console.log("sunk")
            this.unsetPrevAttackAndPrevHit()
            // [x, y] = this.generateRandomCoordinates()
            console.log(this.prevHitShip, this.prevHit, this.prevAttackBool)
            console.log(x, y)
        }

        if (this.prevAttackBool) {
            if (this.prevHitShip.hits == 1) {
                [x, y] = this.humanLikeReflexes();
            }
            else {
                let player1board = document.querySelector('.player1')
                let board = player1board.querySelector('.player1')
                console.log('player1board::::::', board)
                console.log(hitCoordinates)
                console.log(board.querySelector(`[x="${hitCoordinates[0]}"][y="${hitCoordinates[1]}"]`))
                if (!this.prevHitShip.rotation) {
                    x = hitCoordinates[0];
                    y = hitCoordinates[1] + 1;
                    while (!this.checkValidityOfAttack(x, y)) {
                        let previousHit = board.querySelector(`[x="${hitCoordinates[0]}"][y="${hitCoordinates[1]}"]`).classList.contains('ship')
                        let currentHit = board.querySelector(`[x="${hitCoordinates[0]}"][y="${hitCoordinates[1] - 1}"]`).classList.contains('ship')
                        if (previousHit && !currentHit) {
                            y += 1
                        }
                        else {
                            y -= 1
                        }
                    }}
                else {
                    x = hitCoordinates[0] + 1;
                    y = hitCoordinates[1];
                    while (!this.checkValidityOfAttack(x, y)) {
                        let previousHit = board.querySelector(`[x="${hitCoordinates[0]}"][y="${hitCoordinates[1]}"]`).classList.contains('ship')
                        let currentHit = board.querySelector(`[x="${hitCoordinates[0] - 1}"][y="${hitCoordinates[1]}"]`).classList.contains('ship')
                        if (previousHit && !currentHit) {
                            x += 1
                        }
                        else {
                            x -= 1
                        }
                    }
                }
            }
        }

        while (!this.checkValidityOfAttack(x, y)) {
            [x, y] = this.generateRandomCoordinates()
        }

        this.removeAttackFromSet(x, y)
        // console.log(this.attackSet)
        return [x, y]
    }

    checkValidityOfAttack(x, y) {
        if (this.attackSet.has(`${x},${y}`)) {
            return true
        }
        else {
            return false
        }
    }

    humanLikeReflexes() {
        let x = this.prevHit[0];
        let y = this.prevHit[1];
        console.log("------------------")
        console.log(x, y)
        let attackSequence = this.attackMatrix.map(array => [...array]);
        if (attackSequence.length == 0) {return}
        for (let array of attackSequence) {
            console.log(array)
            array[0] += x
            array[1] += y
        }
        let randomSelection = Math.floor(Math.random() * attackSequence.length)
        let randomArray = attackSequence[randomSelection]
        x = randomArray[0];
        y = randomArray[1];
        let z = 0
        while (x < 0 || x > 9 || y < 0 || y > 9 || !this.checkValidityOfAttack(x, y) || z == 5) {
            attackSequence.splice(randomSelection, 1);
            console.log(attackSequence);
            randomSelection = Math.floor(Math.random() * attackSequence.length)
            randomArray = attackSequence[randomSelection];
            console.log(randomArray)
            x = randomArray[0];
            y = randomArray[1];
            z += 1
        }
        console.log("random number: ", randomSelection, randomArray)
        console.log(attackSequence)
        console.log("------------------")
        return [x, y]
    }

    getRotationStatus() {
        return this.enemyRotation
    }

    pressTheAdvantage(x, y) {

    }

    removeAttackFromSet(x, y) {
        if (this.attackSet.has(`${x},${y}`)) {
            this.attackSet.delete(`${x},${y}`)
        }
        return this.attackSet
    }

    setPrevAttackAndPrevHit(prevHitShip, x, y) {
        this.prevHitShip = prevHitShip;
        this.prevHit = [x, y];
        this.prevAttackBool = true;

        console.log(prevHitShip)
    }

    unsetPrevAttackAndPrevHit() {
        this.prevHitShip = null;
        this.prevHit = null;
        this.prevAttackBool = false;
    }

}