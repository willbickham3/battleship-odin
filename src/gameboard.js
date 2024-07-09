import Ship from "./ship.js"

export default class GameBoard {
    constructor() {
        this.miss = 0       // Missed attacks
        this.gameBoard = []
        
        this.unplacedShips = [new Ship("Carrier", 5), new Ship("Battleship", 4), new Ship("Destroyer", 3), new Ship("Submarine", 3), new Ship("Patrol Boat", 2)]
        this.ships = []     // Holds ships placed

        this.missedShots = []
        this.takenSquares = []

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

        const ship = this.unplacedShips.find(obj => obj.name === `${shipName}`);

        if (checkIfCoordsAlreadyLogged(this.takenSquares, x, y)) {
            "HEEEEELLLLOOOO"
            throw Error("Cannot place a ship there! Try again!")
            return

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
            return
        }
        for (let index = 0; index < ship.length; index++) {
            isPlacementValidArray.push([x, y + index])
        }


        try {
            // check that ship doesnt already exist
            isPlacementValidArray.forEach(coordSet => {
                console.log(coordSet)
                console.log(this.gameBoard[coordSet[0]][coordSet[1]])
                if (this.gameBoard[coordSet[0]][coordSet[1]][0] !== null) {
                    console.log(this.gameBoard[coordSet[0]])
                    throw new Error("Ship already exists.")
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
                console.log(this.takenSquares)
            }
            console.log(ship)
            this.ships.push(ship)
            console.log(this.gameBoard)
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