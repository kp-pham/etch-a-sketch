const GRID_LENGTH = GRID_WIDTH = 16;

let grid = document.querySelector(".grid");

for (let i = 0; i < GRID_LENGTH; ++i) {
    for (let j = 0; j < GRID_WIDTH; ++j) {
        const square = document.createElement("div");
        square.classList.add("grid-square");
        grid.appendChild(square);
    }
}

