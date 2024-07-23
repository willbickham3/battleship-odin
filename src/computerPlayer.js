import Player from "./player";

export default class ComputerPlayer extends Player {
    constructor() {
        super('computer');
        this.prev_hit = null;
        this.prev_attack_bool = false;
        this.attack_array = new Set(Array.from({ length: 10 }, (_, x) => Array.from({length: 10}, (_, y) => [x, y])).flat().map(coord => coord.join(',')));
        this.attack_matrix = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
        ]
        this.enemy_rotation = null;
    }

    generateRandomCoordinates() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
    }

    computerAttack() {
        let hitBool         = this.prev_hit
        let hit_coordinates = this.prev_attack

        if (hitBool) {
            let x, y = hit_coordinates
        }

        let [x, y] = this.generateRandomCoordinates()
        return [x, y]
    }

    checkValidityOfAttack(x, y) {
        if (this.attack_array.has(`${x},${y}`)) {
            return true
        }
        else {
            return false
        }
    }

    getRotationStatus() {
        return this.enemy_rotation
    }

    pressTheAdvantage(x, y) {

    }

    removeAttackFromArray(x, y) {
        if (this.attack_array.has(`${x},${y}`)) {
            this.attack_array.delete(`${x},${y}`)
        }
        return this.attack_array
    }

}