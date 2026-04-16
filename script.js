class Cell{
    constructor(row,col) {
        this.row = row;
        this.col = col;
        this.isWall = false;
        this.isVisited = false;
        this.isStart = true;
        this.isGoal = false;
        this.previous = this.previous; //fix this
    }
}

class Grid {
    constructor(rows,cols) {
        this.row = rows;
        this.cols = cols;
        grid = []
    }

    createGrid(){
        //creates grid
    }

    getNeighbors(){
        //gets nearby neighbors 
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

class UiController {

}
