let grid;
let startCell;
let goalCell;

class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.isWall = false;
    this.isVisited = false;
    this.isStart = false;
    this.isGoal = false;
    this.previous = null;

    this.element = document.createElement("div");
    this.element.classList.add("cell");

    this.element.addEventListener("click", () => {
      ui.handleClick(this);
    });
  }

  draw() {
    this.element.className = "cell";

    if (this.isWall) this.element.classList.add("wall");
    if (this.isStart) this.element.classList.add("start");
    if (this.isGoal) this.element.classList.add("goal");
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
  }

  createGrid() {
    const gridEl = document.getElementById("grid");

    gridEl.innerHTML = "";
    gridEl.style.gridTemplateColumns = `repeat(${this.cols}, 25px)`;
    gridEl.style.gridTemplateRows = `repeat(${this.rows}, 25px)`;

    for (let r = 0; r < this.rows; r++) {
      let rowArr = [];

      for (let c = 0; c < this.cols; c++) {
        let cell = new Cell(r, c);
        gridEl.appendChild(cell.element);
        rowArr.push(cell);
      }

      this.cells.push(rowArr);
    }
  }

  getNeighbors(cell) {
    let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    let neighbors = [];

    for (let d of dirs) {
      let r = cell.row + d[0];
      let c = cell.col + d[1];

      if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
        neighbors.push(this.cells[r][c]);
      }
    }

    return neighbors;
  }
}

class Pathfinder {
  constructor(grid) {
    this.grid = grid;
  }

  bfs(start, goal) {
    for (let row of this.grid.cells) {
      for (let cell of row) {
        cell.isVisited = false;
        cell.previous = null;
        cell.element.classList.remove("visited", "path");
      }
    }

    let queue = [];
    queue.push(start);
    start.isVisited = true;

    while (queue.length > 0) {
      let current = queue.shift();

      if (current === goal) {
        this.reconstructPath(goal);
        return;
      }

      for (let neighbor of this.grid.getNeighbors(current)) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.isVisited = true;
          neighbor.previous = current;

          neighbor.element.classList.add("visited");

          queue.push(neighbor);
        }
      }
    }
  }

  reconstructPath(goal) {
    let current = goal;

    while (current !== null) {
      if (!current.isStart && !current.isGoal) {
        current.element.classList.remove("visited");
        current.element.classList.add("path");
      }
      current = current.previous;
    }
  }
}

class UIController {
  constructor() {
    this.mode = "wall";
  }

  init() {
    grid = new Grid(20, 20);
    grid.createGrid();

    startCell = grid.cells[0][0];
    goalCell = grid.cells[19][19];

    startCell.isStart = true;
    goalCell.isGoal = true;

    startCell.draw();
    goalCell.draw();

    this.pathfinder = new Pathfinder(grid);
  }

  handleClick(cell) {

    if (this.mode === "start") {
      if (cell.isWall) return;

      startCell.isStart = false;
      startCell.draw();

      startCell = cell;
      cell.isStart = true;
      cell.draw();
      return;
    }

    if (this.mode === "goal") {
      if (cell.isWall) return;

      goalCell.isGoal = false;
      goalCell.draw();

      goalCell = cell;
      cell.isGoal = true;
      cell.draw();
      return;
    }

    if (cell.isStart || cell.isGoal) return;

    cell.isWall = !cell.isWall;
    cell.draw();
  }

  setMode(mode) {
    this.mode = mode;
  }

  startAlgorithm() {
    this.pathfinder.bfs(startCell, goalCell);
  }

  resetGrid() {
    location.reload();
  }

  createNewGrid() {
    let rows = parseInt(document.getElementById("rowsInput").value);
    let cols = parseInt(document.getElementById("colsInput").value);

    document.getElementById("grid").innerHTML = "";

    grid = new Grid(rows, cols);
    grid.createGrid();

    startCell = grid.cells[0][0];
    goalCell = grid.cells[rows - 1][cols - 1];

    startCell.isStart = true;
    goalCell.isGoal = true;

    startCell.draw();
    goalCell.draw();

    this.pathfinder = new Pathfinder(grid);
  }
}

const ui = new UIController();
ui.init();


