import GameBoard from "./gameboard";

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
        ]
        this.enemyRotation = null;
    }

    generateRandomCoordinates() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
    }

    computerAttack() {
        let hitBool        = this.prevAttackBool
        let hitCoordinates = this.prevHit
        
        let x = null;
        let y = null;

        if (hitBool) {
            console.log(this.prevHitShip)
            console.log(hitCoordinates)
            x = hitCoordinates[0];
            y = hitCoordinates[1] + 1;
            while (!this.checkValidityOfAttack(x, y)) {
                y -= 1
            }
        }

        while (!this.checkValidityOfAttack(x, y)) {
            [x, y] = this.generateRandomCoordinates()
        }

        this.removeAttackFromSet(x, y)
        console.log(this.attackSet)
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

    setPrevAttackAndPrevHit(x, y) {
        this.prevHit = [x, y]
        this.prevAttackBool = true
    }

    unsetPrevAttackAndPrevHit() {
        this.prevHit = null
        this.prevAttackBool = false
    }

}