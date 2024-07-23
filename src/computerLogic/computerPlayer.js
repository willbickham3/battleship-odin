import GameBoard from "../boardAssets/gameboard";

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
        // let hitBool        = this.prevAttackBool
        let hitCoordinates = this.prevHit
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
            console.log(this.prevHitShip)
            console.log(hitCoordinates)
            if (!this.prevHitShip.rotation) {
                x = hitCoordinates[0];
                y = hitCoordinates[1] + 1;
                while (!this.checkValidityOfAttack(x, y)) {
                    y -= 1
                }}
            else {
                x = hitCoordinates[0] + 1;
                y = hitCoordinates[1];
                while (!this.checkValidityOfAttack(x, y)) {
                    x -= 1
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