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

    // createDOMBoard() {
    //     let gameContainer = document.createElement("div")
    //     gameContainer.classList.add("game-container")

    //     this.gameBoard.forEach((row) => {
    //         let rowDiv = document.createElement("div")
    //         rowDiv.classList.add("row")

    //         row.forEach((square) => {
    //             let gameSquare = document.createElement("div")
    //             gameSquare.classList.add("square")

    //             if (square[0] !== null) {
    //                 gameSquare.classList.add("ship")
    //             }

    //             rowDiv.append(gameSquare)  //
    //         })
    //         gameContainer.append(rowDiv)   //
    //     })
    //     return gameContainer
    // }


    placeShip(shipName, x, y) {
        // valid ships: Carrier, Battleship, Destroyer, Submarine, Patrol Boat

        let shipPlacementError = false;
        const ship = this.unplacedShips.find(obj => obj.name === `${shipName}`);


        // first check if the individual spot is taken if so return

        // next check if the length of the ship is taken

        // finally check if adjacent squares are taken


        let me = this.spotCheck(ship.length, x, y)
        let you = this.adjacencyCheck(ship.length, x, y)
        console.log("-------")
        console.log(this.gameBoard, this.gameBoard[x][y], "spot: ", me)
        console.log("adjacency: ", you)
        console.log("-------")

        let newtakenarray = []

        if (you) {    
            for (let set of you) {
                newtakenarray.push(set)
            }}
        if (me) {    
            for (let set of me) {
                if (!checkIfCoordsAlreadyLogged(newtakenarray, set[0], set[1])) {
                newtakenarray.push(set)}
            }}

        for (let set of newtakenarray) {
            if(checkIfCoordsAlreadyLogged(this.takenSquares, set[0], set[1])) {
                console.log("BAD PLAY")
                // alert("Bad boi")
            }
        }

        console.log("taken spots:", newtakenarray)

        if (checkIfCoordsAlreadyLogged(this.takenSquares, x, y)) {
            "HEEEEELLLLOOOO"
            shipPlacementError = true
            // throw Error("Cannot place a ship there! Try again!")
            return

        }

        if (ship == undefined) {
            shipPlacementError = true
        }

        let adjacencyMatrix = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
            [-1, -1],
            [-1, 0],
            [0, -1]
        ]

        // Check to make sure that the ship can be fully placed
        let isPlacementValidArray = []
        if (!ship) {
            shipPlacementError = true
            return
        }
        for (let index = 0; index < ship.length; index++) {
            isPlacementValidArray.push([x, y + index])
        }
        


        try {
            // check that ship doesnt already exist
            isPlacementValidArray.forEach(coordSet => {
                // console.log(coordSet)
                // console.log(this.gameBoard[coordSet[0]][coordSet[1]])
                if (this.gameBoard[coordSet[0]][coordSet[1]][0] !== null) {
                    // console.log(this.gameBoard[coordSet[0]])
                    shipPlacementError = true
                    // throw new Error("Ship already exists.")
                    return
                }
            });

            for (let index = 0; index < ship.length; index++) {
                console.log('placement')

                this.gameBoard[x][y + index] = ship

                // Holds coordinates of placed ships
                adjacencyMatrix.forEach(set => 
                    {
                        let check = checkIfCoordsAlreadyLogged(this.takenSquares, x + index + set[0], y + set[1])
                        if (!check) {
                            this.takenSquares.push([x + set[0], y + index + set[1]])
                        }
                        else {
                            return
                        }
                        })
                // console.log(this.takenSquares)
            }
            // console.log(ship)
            this.ships.push(ship)
            // console.log(this.gameBoard)
            this.unplacedShips = this.unplacedShips.filter(ship => ship.name !== shipName)
            return true
            
        } catch (error) {
            return
            if (ship == undefined) {
                throw new Error(`"${shipName}" is not a valid ship. Please select a valid ship.`)
            }
            else {
            let fail = "There was an error in placing your ship. Please make sure you have entered valid x/y coordinates."
            throw new Error(fail)
            }
        }
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

    spotCheck(length, x, y) {
        console.log("first check")
        let valid = true
        let isPlacementValid = []
        for (let index = 0; index < length; index++) {
            try {
            let spotOnBoard = this.gameBoard[x][y + index]
            if (spotOnBoard[0] !== null) {
                valid = false
            }
        }
            catch {
                return
            }
            finally {
            isPlacementValid.push([x, y + index])}}
        
        if (valid) {
            console.log("Spot check: ", isPlacementValid)
            return isPlacementValid
        }
        else {
            return false
        }
    }
    
    adjacencyCheck(length, x, y) {
        console.log("second check")
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
                    console.log("spot", spot[0], [x + set[0], y + index + set[1]])
                    console.log(index, ": ", [x + set[0], y + index + set[1]])
                    if (spot[0]) {
                        console.log(this.gameBoard[x + set[0]][y + index + set[1]], [x + set[0], y + index + set[1]])
                        valid = false;
                        break;
                    }
                }   catch {
                        valid = false
                        break;
                }}
            
            if (!valid) break;
        }
        
        if (!valid) {
            console.log("invalid value = ", valid)
            return valid
        }
        else {
            for (let index = 0; index < length; index++) {
                for (let set of adjacencyMatrix) {
                    if (!checkIfCoordsAlreadyLogged(isPlacementValid, x + set[0], y + index + set[1])) {
                        isPlacementValid.push([x + set[0], y + index + set[1]])
                        
                    }
                console.log(isPlacementValid)
            }
        }
        console.log("mein", isPlacementValid)
        console.log("length: ", length)
        return isPlacementValid
    }}

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