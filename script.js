class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.isWall = false;
    this.isVisited = false;
    this.isStart = false;
    this.isGoal = false;
    this.previous = null;
    this.element = null;
  }
}

class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        let cell = new Cell(i, j);
        row.push(cell);
      }
      this.cells.push(row);
    }
  }

  getNeighbors(cell) {
    let neighbors = [];
    let { row, col } = cell;

    if (row > 0) neighbors.push(this.cells[row - 1][col]);
    if (row < this.rows - 1) neighbors.push(this.cells[row + 1][col]);
    if (col > 0) neighbors.push(this.cells[row][col - 1]);
    if (col < this.cols - 1) neighbors.push(this.cells[row][col + 1]);

    return neighbors;
  }
}

class Pathfinder {
    bfs(start,goal) {
        // for loop goes here

        if //neighbor !isWall && neighbor 
        neighbor.isVisited = true;
        neighbor.previous = current;
        queue.push(neighbor);
        if (current === goal) {
            // then build path by working backwards 
        }
    }
}


