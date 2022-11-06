import { getPosition } from "../utils/position";
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

  public getDiscsAmount(disc: number): number {
    let discsAmount = 0;

    for (let i = 0; i < this.rows * this.columns; i++) {
      const { row, col } = getPosition(i, this.columns);

      if (this.board[row][col] === disc) discsAmount++;
    }

    return discsAmount;
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

  get getWhiteDiscsAmount() {
    return this.getDiscsAmount(2);
  }

  get getBlackDiscsAmount() {
    return this.getDiscsAmount(1);
  }
}

export default Board;