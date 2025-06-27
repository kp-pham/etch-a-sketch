const SQUARES_PER_SIZE_LIMIT = 100;
let gridLength = gridWidth = 16;

const button = document.querySelector("button");
const grid = document.querySelector(".grid");

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

function deleteGridSquares() {
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach(gridSquare => grid.removeChild(gridSquare));
}

function createGridSquares(gridLength, gridWidth) {
    const flexBasis = calculateFlexBasis(gridLength);
    
    for (let i = 0; i < gridLength; ++i) {
        for (let j = 0; j < gridWidth; ++j) {
            const square = document.createElement("div");
            square.classList.add("grid-square");
            square.style.flexBasis = `${flexBasis}%`;
            grid.appendChild(square);
        }
    } 
}

function calculateFlexBasis(gridLength) {
    return (1 / gridLength) * 100;
}

grid.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "red";
});

grid.addEventListener("mouseout", (event) => {
    event.target.style.backgroundColor = "white";
});

button.addEventListener("click", (event) => {
    gridLength = gridWidth = getGridDimensions();
    deleteGridSquares();
    createGridSquares(gridLength, gridWidth);
});

createGridSquares(gridLength, gridWidth);