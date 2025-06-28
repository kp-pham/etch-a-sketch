# etch-a-sketch

The etch-a-sketch project simulates a sketchpad using Javascript. The page is structured as a grid of squares and each square changes to a random color when the cursor hovers over the square. The color of the square darkens when the cursor passes through the square more than once until the square becomes completely colored. There is also a button for the user to provide the number of squares per side of the grid to change the size of the grid.

The project uses event-driven programming to implement interactivity such as changing the color of the square and darkening the square when the cursor hovers of the square and dynamically generate content such as creating a grid of squares based on the number of squares per side provided by the user.

## Dynamically Generating Content

The original dimensions of the grid are 16x16 when the page is loaded. There is a button at the top of the page for the user to press to change the dimensions of the grid and the user is prompted to provide the number of squares per side to set the new dimensions for the grid. The user is reprompted when the user provides an invalid number, a negative number, or the number of squares per side provided exceeds the established limit to prevent straining computer resources.

```
function getGridDimensions() {
    let squaresPerSide;

    while (true) {
        squaresPerSide = parseInt(prompt("How many squares per side?"));

        if (isNaN(squaresPerSide)) 
            alert("Please provide a valid number.");

        else if (squaresPerSide < 0)
             alert("The number of squares per side must be a positive.");

        else if (squaresPerSide > SQUARES_PER_SIZE_LIMIT)
             alert("The maximum number of squares per side is 100.");

        else 
            break;
    }

    return squaresPerSide;
}
```

To delete the squares of the original grid, the squares of the grid are selected and stored in a ```NodeList``` which is traversed over to remove each element from the parent container. The class selector ```grid-square``` which was added to the squares of the grid when created after DOM content was loaded is used to select the elements from the DOM tree when parsing the DOM content.

```
function deleteGridSquares() {
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}
```

To create the squares of the grid with the new dimensions, a nested for loop is used to determine the boundaries of the grid based on the number of squares per side the user indicated. The squares are created as ```div``` elements and are assigned the class selector ```grid-square```. The ```flex-basis``` property of the squares is set based on the number of squares per side for the rows and columns of the grid to have the same number of squares. The ```opacity``` property of the squares is set to ```0``` for the squares to be completely transparent and allow for the squares to become completely colored over the course of multiple interactions. Each of the squares are appended to the parent container which together form the grid.
```
function createGridSquares(gridLength, gridWidth) {
    const flexBasis = calculateFlexBasis(gridLength);
    
    for (let i = 0; i < gridLength; ++i) {
        for (let j = 0; j < gridWidth; ++j) {
            const square = document.createElement("div");
            square.classList.add("grid-square");
            square.style.flexBasis = `${flexBasis}%`;
            square.style.opacity = "0";
            grid.appendChild(square);
        }
    } 
}

function calculateFlexBasis(gridLength) {
    return (1 / gridLength) * 100;
}

```

When the user presses the button at the top of the page, the event capturing phase is triggered and the ```click``` event propagates from the ```document``` object through the ```html``` and ```body``` elements of the ```document``` to the ```button``` element. The event listener of the ```button``` element captures the event and handles the event with the callback function which prompts the user for the dimensions of the new grid, deletes the squares of the original grid, and creates the squares of the new grid with the dimensions the user provided. The event bubbling phase is triggered after the event is captured and handled and proprates from the ```button``` element to the ```document``` object as an indication that the event has been handled. 

```
button.addEventListener("click", (event) => {
    gridLength = gridWidth = getGridDimensions();
    deleteGridSquares();
    createGridSquares(gridLength, gridWidth);
});
```