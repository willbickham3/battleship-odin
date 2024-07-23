export default class Ship {
    constructor(name, length) {
        this.length = length
        this.name = name
        this.hits = 0
        this.sunk = false
    }
    
    hit() {
        this.hits += 1
        this.isSunk()
        return this.hits
    }

    isSunk() {
        if (this.hits == this.length) {
            this.sunk = true
        }
        else {return false}
    }
}