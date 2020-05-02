import { Board } from "./Board";

const ELEMENT_GAME_BOARD = document.getElementById("board") as HTMLDivElement
const ELEMENT_REFRESH_BUTTON = document.getElementById("refresh")
const INTERVAL = 1200 
const BOARD_HEIGHT = 20
const BOARD_WIDTH = 30

let board: Board
let timer: number

function main() {
  if (board) {
    board.dispose()
  }

  board = new Board(ELEMENT_GAME_BOARD, BOARD_HEIGHT, BOARD_WIDTH,)

  board.render()

  timer = setInterval(() => {
    const cont = board.nextGeneration()
    if (!cont) {
      clearInterval(timer)
    }
  }, INTERVAL)
}

ELEMENT_REFRESH_BUTTON.addEventListener("click", () => {
  clearInterval(timer)
  main()
})

main()
