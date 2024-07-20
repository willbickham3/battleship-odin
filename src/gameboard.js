import Ship from "./ship.js"

export default class GameBoard {
    constructor() {
        this.miss = 0       // Missed attacks
        this.gameBoard = []
        
        this.unplacedShips = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Destroyer", 3), new Ship("Submarine", 3), new Ship("Patrol Boat", 2)]
        this.ships = []     // Holds ships placed

        this.missedShots = []
        this.takenSquares = []
        this.experiment = []
        this.shots = [];

        this.prev_attack = null;
        this.prev_hit = false;

        // Creates the board
        for (let index = 0; index < 10; index++) {
            const row = []
            for (let index = 0; index < 10; index++) {
                const columnSquare = [null]
                row.push(columnSquare)
            }
            this.gameBoard.push(row)
        }
    }


    placeShip(shipName, x, y, orientation) {
        // valid ships: Carrier, Battleship, Destroyer, Submarine, Patrol Boat

        let shipPlacementError = false;
        const ship = this.unplacedShips.find(obj => obj.name === `${shipName}`);

        let me = this.spotCheck(ship.length, x, y, orientation);
        // let you = this.adjacencyCheck(ship.length, x, y);

        if (!me) {return}
        // || !you

        let newtakenarray = []
        // console.log("Check-Point: 1")
        // if (you) {    
        //     for (let set of you) {
        //         if (!checkIfCoordsAlreadyLogged(this.experiment, set[0], set[1])) {
        //         newtakenarray.push(set)
        //         }

        //     }}
        // console.log("Check-Point: 2")
        if (me) {    
            for (let set of me) {
                if (!checkIfCoordsAlreadyLogged(newtakenarray, set[0], set[1]) && !checkIfCoordsAlreadyLogged(this.experiment, set[0], set[1])) {
                newtakenarray.push(set)}
            }}
        
            // console.log("Check-Point: 3")
        
        for (let set of newtakenarray) {
            if(checkIfCoordsAlreadyLogged(this.takenSquares, set[0], set[1])) {
                console.log("BAD PLAY")
                // alert("Bad boi")
            }
            else {
                this.experiment.push(set)
            }
        }
        
        if (shipPlacementError) return;

        // console.log("taken spots:", newtakenarray)
        // this.experiment.push(...newtakenarray)
        // console.log("Experimental Array: ", this.experiment)

        if (checkIfCoordsAlreadyLogged(this.takenSquares, x, y)) {
            "HEEEEELLLLOOOO"
            shipPlacementError = true
            // throw Error("Cannot place a ship there! Try again!")
            return

        }

        if (ship == undefined) {
            shipPlacementError = true
        }

        // Check to make sure that the ship can be fully placed
        let isPlacementValidArray = []
        if (!ship) {
            shipPlacementError = true
            return
        }
        for (let set of me) {
            this.gameBoard[set[0]][set[1]] = ship
        }
        
        this.takenSquares.push(...newtakenarray)
        this.ships.push(ship)
        // console.log(this.gameBoard)
        this.unplacedShips = this.unplacedShips.filter(ship => ship.name !== shipName)
        return true
    }

    receiveAttack(x, y) {
        try {
            this.gameBoard[x][y].hit()
            console.log("It's a hit!")
            this.prev_attack = [x, y]
            this.prev_hit = true
            return true
        } catch (error) {
            this.missedAttack()
            this.missedShots.push([x, y])
            this.prev_attack = null
            this.prev_hit = false
            return false
        }
        finally {
            this.shots.push([x, y])
        }
    }

    missedAttack() {
        this.miss += 1
        return this.miss
    }

    gameOver() {
        for (const ship of this.ships) {
            if (ship.sunk == false) {
                console.log("Game is still going.")
                return false 
            }
        }
        console.log("Game Over, Man. Game Over.")
        return true
    }

    spotCheck(length, x, y, orientation) {
        // console.log("first check")
        let valid = true
        let isPlacementValid = []
        let startX = x
        let startY = y

        for (let index = 0; index < length; index++) {
            x = orientation === 'vertical' ? startX : startX + index
            y = orientation === 'vertical' ? startY + index : startY
            try {
            let spotOnBoard = this.gameBoard[x][y]
            if (spotOnBoard[0] !== null) {
                valid = false
            }
        }
            catch {
                return
            }
            finally {
            isPlacementValid.push([x, y])}}
        
        if (valid) {
            // console.log("Spot check: ", isPlacementValid)
            return isPlacementValid
        }
        else {
            return false
        }
    }
    
    adjacencyCheck(length, x, y) {
        // console.log("second check")
        let valid = true
        let isPlacementValid = []
        let adjacencyMatrix = [
            [1, -1],
            [1, 0],
            [0, 1],
            [1, 1],
            [-1, -1],
            [-1, 0],
            [0, -1],
            [-1, 1]
        ]
        for (let index = 0; index < length; index++) {
            for (let set of adjacencyMatrix) {
                try {
                    let spot = this.gameBoard[x + set[0]][y + index + set[1]]
                    // console.log("spot", spot[0], [x + set[0], y + index + set[1]])
                    // console.log(index, ": ", [x + set[0], y + index + set[1]])
                    if (spot[0] !== null) {
                        // console.log(this.gameBoard[x + set[0]][y + index + set[1]], [x + set[0], y + index + set[1]])
                        valid = false;
                        break;
                    }
                    else {
                        if (!checkIfCoordsAlreadyLogged(isPlacementValid, x + set[0], y + index + set[1])) {
                            isPlacementValid.push([x + set[0], y + index + set[1]])
                        }
                        continue
                    }
                }   catch {
                        continue
                        console.log("index error")
                        // valid = false
                        //break;
                        
                }}
            
            if (!valid) break;
        }
        
        if (!valid) {
            console.log("invalid value = ", valid)
            return valid
        }
        else {
            return isPlacementValid
        }
}

}



function checkIfCoordsAlreadyLogged(array, a, b) {
    let check = false
    array.forEach((set) => {
        if (set[0] == a && set[1] == b) {
            check = true
            return true
        }
    })
    if (check) {
        return true
    }
    else {
        return false
    }
}