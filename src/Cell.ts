export class Cell {
  htmlElement: HTMLDivElement;
  private alive = false

  constructor(private row: number, private col: number) {
    this.htmlElement = document.createElement("div")
    this.htmlElement.classList.add("cell")
  }

  get isAlive(): boolean {
    return this.alive
    // return this.htmlElement.classList.contains("alive")
  }

  toggleState() {
    this.htmlElement.classList.toggle("alive")
    this.alive = !this.alive
  }
}
