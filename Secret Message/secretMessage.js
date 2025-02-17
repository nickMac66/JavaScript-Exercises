// URL of the Google Docs document to fetch
const url = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub';

const xCoordinates = []
const yCoordinates = []
const characters = []
let gridArray = []
const maxCols = 4
const maxRows = 3
let gridObj = {}

const getData = async () => {

    fetch(url)
        .then(response => response.text())
        .then(data => {

            const parser = new DOMParser()
            const doc = parser.parseFromString(data, 'text/html')
            const row = doc.getElementsByTagName("tr")

            // Get the characters and their x/y coordinates from the document 
            for (let rowIndex = 1; rowIndex < row.length; rowIndex++) {
                let currentRow = row[rowIndex].textContent

                for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                    let currentCol = currentRow[colIndex]

                    switch (colIndex) {
                        case 0:
                            x = `${currentCol}`
                            break
                        case 1:
                            char = `${currentCol}`
                            break
                        case 2:
                            y = `${currentCol}`
                            break
                        default:
                            "invalid"
                    }
                }

                // Define an object referencing the current character and its coordinates
                let rowObj = {
                    char: `${char}`,
                    x: `${x}`,
                    y: `${y}`
                }

                // Add the current row object to an array 
                gridArray.push(rowObj)
            }

            // Add the array of row objects to the main grid object
            Object.assign(gridObj, gridArray)
            getSecretMessage(gridObj)
        })
        .catch(error => console.error('Error: ', error))
}

const getSecretMessage = async (grid) => {

    const secretMessageArray = Array.from({length: maxRows}, () => Array(maxCols).fill(" "))    

    for (let rowObj in grid) {

        if (grid.hasOwnProperty(rowObj)) {

            // 0 = bottom left
            secretMessageArray[2][0] = grid[0].char
            secretMessageArray[1][0] = grid[1].char
            secretMessageArray[0][0] = grid[2].char
            secretMessageArray[1][1] = grid[3].char
            secretMessageArray[0][1] = grid[4].char
            secretMessageArray[1][2] = grid[5].char
            secretMessageArray[0][2] = grid[6].char
            secretMessageArray[0][3] = grid[7].char
        }        
    }    

    let counter = 0
    secretMessageArray.forEach(row => {

        row.forEach(col => {

            document.body.innerHTML += `${col}`
            counter++

            if (counter === maxCols) {
                counter = 0
                document.body.innerHTML += '<br>'
            }
        })
    });

    secretMessageArray.forEach(row => {
        console.log(row.join(''));
    });
}

getData()