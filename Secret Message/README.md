# Secret Message

## Project Description
This program fetches data from a Google Docs document containing characters and their coordinates, 
then arranges these characters in a 2D grid to reveal a secret message.

## Problem:
You are given a Google Doc that contains a list of Unicode characters and their positions in a 2D grid. 
Write a function that takes in the URL for the Google Doc as an argument, retrieves and parses the data 
in the document, and prints the grid of characters.

## Requirements:
- The document specifies the Unicode characters and their respective x and y coordinates in the grid.

- The minimum possible value for these coordinates is 0. There is no upper limit, meaning the grid can be of any size.

- Any positions in the grid that do not have a specified character should be filled with a space character.

## Output: 
- The function should display the extracted Unicode characters in the browser in the shape of an 'F'

## How to run:
1. Clone this repository to your local machine
2. Serve the index.html file on a local server
3. Open your browser, and you'll see the extracted Unicode characters arranged to form the shap of an 'F'
