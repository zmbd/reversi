import BoardDrawer from "./BoardDrawer";
import DomElements from "./DomElements";
import Game from "./Game";

class Board extends BoardDrawer {
  private rows = 8;
  private columns = 8; 
  private board: number[][];

  constructor(board: number[][]) {
    super(board, 8, 8);
    this.board = board;
  }

  appendChild(child: HTMLElement): void {
    throw new Error("Method not implemented.");
  }
  addEventListener(event: string, func: Function): void {
    throw new Error("Method not implemented.");
  }

  get getRows() {
    return this.rows;
  }

  get getColumns() {
    return this.columns;
  }

  set setBoard(board: number[][]) {
    this.board = board;
  }

  get getBoard() {
    return this.board;
  }
}

export default Board;