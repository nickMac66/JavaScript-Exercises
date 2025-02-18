// URL of the Google Docs document to fetch
// const url = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub';
const url = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub'
let rowObjects = []
let maxCols = 94
let maxRows = 7

/**
 * Fetch data from a Google Docs document, parse it, and generate a secret message.
 * This function retrieves the document and extracts characters and their x/y coordinates
 */
const getData = () => {

    // Fetch the document data from the URL
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser()                              // Create a new DOM parser
            const doc = parser.parseFromString(data, 'text/html')       // Parse the document as HTML            
            const tableRows = doc.getElementsByTagName("tr")

            for (let i = 1; i < tableRows.length; i++) {
                const currentRow = tableRows[i]
                const tableData = currentRow.getElementsByTagName("td")

                let rowObject = {
                    x: tableData[0].textContent,
                    char: tableData[1].textContent,
                    y: tableData[2].textContent
                }

                rowObjects.push(rowObject)
            }

            getSecretMessage(rowObjects)

        })
        .catch(error => console.error('Error: ', error))
}

/**
 * Retrieve and display the secret message from the grid
 * This function processes a grid of objects, each containing a char and its x/y coordinates,
 * arranges the characters into a 2D array, and appends the formatted results to the HTML doc
 * 
 * @param {Array} rowObjects - Array of objects, each containing a char and its x/y coordinates 
 */
const getSecretMessage = async (rowObjects) => {

    let x = 0
    let y = 0
    let char = " "

    let secretMessageArray = Array.from({ length: maxRows }, () => Array(maxCols).fill(" "))        // Initialize a 2D array with empty spaces
    
    rowObjects.forEach(row => {
        x = row.x
        y = row.y
        char = row.char
        // console.log("x: ", x, "y: ", y, "char", char)
        secretMessageArray[y][x] = char
    })

    // console.log("x: ", x, "y: ", y, "char", char)
    // secretMessageArray[y][x] = char

    console.log(secretMessageArray)



    // // Iterate over the grid of objects, each containing a character and its x/y coordinates
    // for (let rowIndex in rowObjects) {

    //     // Extract character and its x/y coordinates from the current row object
    //     let rowObj = grid[rowIndex]
    //     let char = rowObj.char
    //     let x = rowObj.x
    //     let y = rowObj.y

    //     secretMessageArray[y][x] = char     // Place the character in the corresponding position in the secretMessage array 
    // }

    // secretMessageArray.reverse()            // Reverse the array to get correct layout for the secret message

    // // Append characters from the secretMessageArray to the HTML document, formatting them into rows and cols
    // let colIndex = 0
    // secretMessageArray.forEach(row => {

    //     row.forEach(col => {
    //         document.body.innerHTML += `${col}`
    //         colIndex++

    //         if (colIndex === maxCols) {
    //             colIndex = 0
    //             document.body.innerHTML += '<br>'
    //         }
    //     })
    // });
}

getData()