// URL of the Google Docs document to fetch
const url = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub';

const xCoordinates = []
const yCoordinates = []
const characters = []
let gridArray = []
const maxCols = 4
const maxRows = 3
let gridObj = {}

/**
 * Fetch data from a Google Docs document, parse it, and generate a secret message.
 * This function retrieves the document and extracts characters and their x/y coordinates
 */
const getData = async () => {

    // Fetch the document data from the URL
    fetch(url)         
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser()                              // Create a new DOM parser
            const doc = parser.parseFromString(data, 'text/html')       // Parse the document as HTML
            const row = doc.getElementsByTagName("tr")                  // Get all table rows from the document

            // Get the characters and their x/y coordinates from the document 
            for (let rowIndex = 1; rowIndex < row.length; rowIndex++) {
                let currentRow = row[rowIndex].textContent

                for (let colIndex = 0; colIndex < currentRow.length; colIndex++) {
                    let currentCol = currentRow[colIndex]

                    switch (colIndex) {
                        case 0:
                            x = `${currentCol}`         // Extract x-coordinate
                            break
                        case 1:
                            char = `${currentCol}`      // Extract character
                            break
                        case 2:
                            y = `${currentCol}`         // Extract y-coordinate
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
                
                gridArray.push(rowObj)      // Add the current row object to an array 
            }

            // Add the array of row objects to the main grid object & call the function to generate the secret message
            Object.assign(gridObj, gridArray)
            getSecretMessage(gridObj)           
        })
        .catch(error => console.error('Error: ', error))
}

/**
 * Retrieve and display the secret message from the grid
 * This function processes a grid of objects, each containing a char and its x/y coordinates,
 * arranges the characters into a 2D array, and appends the formatted results to the HTML doc
 * 
 * @param {Array} grid - Array of objects, each containing a char and its x/y coordinates 
 */
const getSecretMessage = async (grid) => {
    
    let secretMessageArray = Array.from({ length: maxRows }, () => Array(maxCols).fill(" "))        // Initialize a 2D array with empty spaces

    // Iterate over the grid of objects, each containing a character and its x/y coordinates
    for (let rowIndex in grid) {

        // Extract character and its x/y coordinates from the current row object
        let rowObj = grid[rowIndex]
        let char = rowObj.char
        let x = rowObj.x
        let y = rowObj.y
        
        secretMessageArray[y][x] = char     // Place the character in the corresponding position in the secretMessage array 
    }
    
    secretMessageArray.reverse()            // Reverse the array to get correct layout for the secret message
    
    // Append characters from the secretMessageArray to the HTML document, formatting them into rows and cols
    let colIndex = 0
    secretMessageArray.forEach(row => {

        row.forEach(col => {
            document.body.innerHTML += `${col}`
            colIndex++

            if (colIndex === maxCols) {
                colIndex = 0
                document.body.innerHTML += '<br>'
            }
        })
    });
}

getData()