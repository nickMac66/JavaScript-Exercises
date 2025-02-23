// URL of the Google Docs document to fetch
const url = 'https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub'
// const url = 'https://docs.google.com/document/d/1U6EHJT_m8kcep4498nfnzPD9bD0uCnZmZC7CElMKYxU/edit?tab=t.0'
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
            const parser = new DOMParser()                                  // Create a new DOM parser
            const doc = parser.parseFromString(data, 'text/html')           // Parse the document as HTML  
            const tableRows = doc.getElementsByTagName("tr")                // Get all table rows from the document

            for (let i = 1; i < tableRows.length; i++) {
                const currentRow = tableRows[i]                             // Get the current row
                const tableData = currentRow.getElementsByTagName("td")     // Get all table cells from the document

                // Create an object with x, char, and y properties based on the table data
                let rowObject = {
                    x: tableData[0].textContent,
                    char: tableData[1].textContent,
                    y: tableData[2].textContent
                }

                rowObjects.push(rowObject)                      // Add the row object to the array of row objects
            }

            getSecretMessage(rowObjects)                        // Generate and display the secret message
        })
        .catch(error => console.error('Error: ', error))        // Log any errors that occur during the fetch operation
}

/**
 * Retrieve and display the secret message from the grid
 * This function processes a grid of objects, each containing a char and its x/y coordinates,
 * arranges the characters into a 2D array, and logs the secret message in the browser console
 * 
 * @param {Array} rowObjects - Array of objects, each containing a char and its x/y coordinates 
 */
const getSecretMessage = (rowObjects) => {

    let secretMessageArray = Array.from({ length: maxRows }, () => Array(maxCols).fill(""))        // Initialize a 2D array with empty spaces

    // Iterate over the row objects to populate the 2D array with characters
    rowObjects.forEach(row => {
        let x = row.x
        let y = row.y
        let char = row.char
        secretMessageArray[y][x] = char
    })

    secretMessageArray.reverse()                // Reverse the array to set x/y origin to bottom left of the 2D grid    

    let div = document.createElement('div');    // Create a div element    
    div.style.fontFamily = 'monospace'          // Apply monospace font to properly display the secret message

    // Print each row of the grid to the browser
    for (let i = 0; i < secretMessageArray.length; i++) {

        let current = secretMessageArray[i]     // Current row in the 2D grid

        current.forEach(val => {
            
            // Add spaces when necessary            
            if (val === "") {
                div.innerHTML += '&nbsp'        
            }

            div.innerHTML += val                // Print the current character
        })

        div.innerHTML += '<br>'                 // Add a line break at the end of each row of characters
    }

    document.body.append(div);                  // Append the secret message to the document body

}

getData()                                       // Fetch the URL data and display the secret message