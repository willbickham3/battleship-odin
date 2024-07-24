import Ship from "./ship.js"

export default class GameBoard {
    constructor() {
        this.miss = 0       // Missed attacks
        this.gameBoard = []
        
        this.unplacedShips = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Destroyer", 3), new Ship("Submarine", 3), new Ship("PatrolBoat", 2)]
        this.ships = []     // Holds ships placed

        this.missedShots = []
        this.takenSquares = []
        this.experiment = []
        this.shots = [];

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

    getPlacedShips() {
        return this.ships
    }

    getUnplacedShips() {
        return this.unplacedShips
    }

    getShots() {
        return this.shots
    }

    getPrevHitandAttack() {
        return this.prevHit, this.prevAttack
    }

    computerPlayer() {
        let [x, y] = this.generateRandomCoordinates();
        
        while (this.unplacedShips.length > 0) {
            let rndInt = Math.floor(Math.random() * 2) + 1
            console.log(rndInt)
            if (rndInt == 2) {
            this.placement_orientation = 'vertical'}
            else {
                this.placement_orientation = 'horizontal'
            }
            let computerShips = this.getUnplacedShips()
            let nextShip = computerShips[0]
            this.placeShip(nextShip.name, x, y, this.placement_orientation);
            [x, y] = this.generateRandomCoordinates();
        }
    }

    generateRandomCoordinates() {
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        return [x, y]
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

        if (checkIfCoordsAlreadyLogged(this.takenSquares, x, y)) {
            "HEEEEELLLLOOOO"
            shipPlacementError = true
            return

        }

        if (ship == undefined) {
            shipPlacementError = true
        }

        // Check to make sure that the ship can be fully placed
        if (!ship) {
            shipPlacementError = true
            return
        }
        for (let set of me) {
            this.gameBoard[set[0]][set[1]] = ship
        }

        if (orientation == 'horizontal') {
            ship.rotation = true
        }
        
        this.takenSquares.push(...newtakenarray)
        this.ships.push(ship)
        this.unplacedShips = this.unplacedShips.filter(ship => ship.name !== shipName)
        return true
    }

    receiveAttack(x, y) {
        try {
            this.gameBoard[x][y].hit()
            console.log("It's a hit!")
            return true
        } catch (error) {
            this.missedAttack()
            this.missedShots.push([x, y])
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