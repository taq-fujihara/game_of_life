import { Cell } from "./Cell";

export class Board {
  cells: Cell[][] = []

  constructor(
    private container: HTMLDivElement,
    private height: number,
    private width: number,
  ) {
    if (width <= 0 || height <= 0) {
      throw new Error("Board width and height must be greater than 0")
    }

    for (let row = 0; row < height; row++) {
      const rowCells: Cell[] = []
      const rowDiv: HTMLDivElement = document.createElement("div");
      rowDiv.classList.add("row")

      for (let col = 0; col < width; col++) {
        const cell = new Cell(row, col)

        // randomly generate alive cells
        if (Math.round(Math.random() * 2) === 0) {
          cell.toggleState()
        }

        rowCells.push(cell)
      }
      this.cells.push(rowCells)
    }
  }

  render() {
    for (const rowCells of this.cells) {
      const row = document.createElement("div")
      row.classList.add("row")
      for (const cell of rowCells) {
        row.appendChild(cell.htmlElement)
      }
      this.container.appendChild(row)
    }
  }

  nextGeneration(): boolean {
    const cellsChaningState = new Set<Cell>()

    for (let row = 0; row < this.cells.length; row++) {
      for (let col = 0; col < this.cells[row].length; col++) {
        // takes cells next to the target(8 cells)
        const cellsAround: Cell[] = []
        const indexes = [
          [row - 1, col - 1],
          [row - 1, col],
          [row - 1, col + 1],
          [row, col - 1],
          [row, col + 1],
          [row + 1, col - 1],
          [row + 1, col],
          [row + 1, col + 1],
        ]
        for (const index of indexes) {
          const cell = this.cellAt(index[0], index[1])
          if (cell) {
            cellsAround.push(cell)
          }
        }

        const numAlive = cellsAround.filter(cell => cell.isAlive).length

        if (this.test(this.cells[row][col], numAlive)) {
          cellsChaningState.add(this.cells[row][col])
        }
      }
    }

    cellsChaningState.forEach(cell => {
      cell.toggleState()
    })

    if (cellsChaningState.size === 0) {
      return false
    }

    cellsChaningState.clear()

    return true
  }

  cellAt(row: number, col: number): Cell | null {
    if (row < 0 || row >= this.height) {
      return null
    }
    if (col < 0 || col >= this.width) {
      return null
    }
    return this.cells[row][col]
  }

  test(cell: Cell, numAlive: number): boolean {
    // TODO Separate from this class
    if (cell.isAlive) {
      if (numAlive <= 1) {
        return true
      }
      if (numAlive >= 4) {
        return true
      }
    } else {
      if (numAlive === 3) {
        return true
      }
    }
    return false
  }

  dispose() {
    this.container.innerHTML = ''
    this.cells = []
  }
}
