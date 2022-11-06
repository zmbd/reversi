import Board from "./Board";

abstract class BoardDrawer {
  private size = 50;
  private gap = 3;
  private boardElement = document.getElementById("board");
  private squareElement: HTMLElement | null = null;
  private discElement: HTMLElement | null = null;

  constructor(board: number[][], rows: 8, columns: 8) {
    this.drawBoard(board, rows, columns);
  }

  private addSquareStyle(i: number, direction: "top" | "left", element: HTMLElement): void {
    const position = `${(this.size + this.gap) * i + this.gap}px`;

    if (direction === "top") element.style.top = position;
    else element.style.left = position;
  }

  private returnAddedSquare(row: number, col: number): HTMLElement {
    this.squareElement = document.createElement("div");
    this.squareElement.classList.add("square");
    this.addSquareStyle(row, "top", this.squareElement);
    this.addSquareStyle(col, "left", this.squareElement);

    return this.squareElement;
  }

  private removeDiscIfExists(): void {
    if (this.squareElement?.getElementsByClassName("disc")[0]) {
      this.squareElement.removeChild(this.squareElement.getElementsByClassName("white")[0] || this.squareElement.getElementsByClassName("black")[0]);
    }
  }
 
  private drawSquares(board: number[][], rows: 8, columns: 8): void {

    for (let i = 0; i < rows * columns; i++) {
      let row: number = Math.floor(i / columns);
      let col: number = i % columns;

      this.boardElement?.appendChild(this.returnAddedSquare(row, col));
    }
  }

  public drawDiscs(board: number[][], rows: 8, columns: 8): void {
    for (let i = 0; i < rows * columns; i++) {
      let row: number = Math.floor(i / columns);
      let col: number = i % columns;

      this.squareElement = document.querySelector(`.square:nth-child(${row * 8 + col + 1})`);

      if (!this.squareElement) break;
      
      this.removeDiscIfExists();

      this.discElement = this.squareElement.appendChild(document.createElement("div"));

      if (board[row][col] === 1) this.discElement.classList.add("disc", "black");
      else if (board[row][col] === 2) this.discElement.classList.add("disc", "white");

      this.addSquareStyle(col, "left", this.discElement);
      this.addSquareStyle(row, "top", this.discElement);
    }
  }

  public drawBoard(board: number[][], rows: 8, columns: 8): void {
    this.drawSquares(board, rows, columns);
    this.drawDiscs(board, rows, columns);
  }
}

export default BoardDrawer;