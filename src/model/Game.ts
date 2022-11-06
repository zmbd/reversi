import type { DiskPosType } from "types/interface";
import {getPosition} from "../utils/position";
import Board from "./Board";
import Score from "./Score";

export class Game extends Board {
  private player: 1 | 2;
  private finished: boolean;
  private score = new Score();
  private turnElement: HTMLElement = document.createElement("h1");

  constructor(board: number[][]) {
    super(board);
    this.player = 1;
    this.finished = false;

    document.querySelector("#current-turn")?.appendChild(this.turnElement);
    this.turnElement.textContent = "Black's turn";

    this.addClickableSquares();
  }

  private getMoveAffectedDiscs(row: number, col: number) {
    let board = this.getBoard;
    let affectedDiscs: DiskPosType[] = [];
    let directionAffectedDisks: DiskPosType[] = [];

    //check up
    for (let i = row - 1; i >= 0; i--) {
      if (this.isPlayerDiscDetected(board[i][col])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][col], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, col);
    }

    //check down
    directionAffectedDisks = [];
    for (let i = row + 1; i < this.getRows; i++) {
      if (this.isPlayerDiscDetected(board[i][col])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][col], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, col);
    }

    //check left
    directionAffectedDisks = [];
    for (let i = col - 1; i >= 0; i--) {
      if (this.isPlayerDiscDetected(board[row][i])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[row][i], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, row, i);
    }

    //check right
    directionAffectedDisks = [];
    for (let i = col + 1; i < this.getColumns; i++) {
      if (this.isPlayerDiscDetected(board[row][i])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[row][i], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, row, i);
    }
   
    //check up left
    directionAffectedDisks = [];
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (this.isPlayerDiscDetected(board[i][j])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][j], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, j);
    }

    //check up right
    directionAffectedDisks = [];
    for (let i = row - 1, j = col + 1; i >= 0 && j < this.getColumns; i--, j++) {
      if (this.isPlayerDiscDetected(board[i][j])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][j], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, j);
    }

    //check down left
    directionAffectedDisks = [];
    for (let i = row + 1, j = col - 1; i < this.getRows && j >= 0; i++, j--) {
      if (this.isPlayerDiscDetected(board[i][j])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][j], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, j);
    }

    //check down right
    directionAffectedDisks = [];
    for (let i = row + 1, j = col + 1; i < this.getRows && j < this.getColumns; i++, j++) {
      if (this.isPlayerDiscDetected(board[i][j])) {
        affectedDiscs = this.mergeAffectedDiscsArray(board[i][j], affectedDiscs, directionAffectedDisks);
        break;
      }

      this.setDirectionAffectedDisks(directionAffectedDisks, i, j);
    }

    return affectedDiscs;
  }

  private isPlayerDiscDetected(board: number): boolean {
    if (board === this.player || board === 0) return true;

    return false;
  }

  private mergeAffectedDiscsArray(board: number, affectedDiscs: DiskPosType[], directionAffectedDisks: DiskPosType[]): DiskPosType[] {
    if (this.player === board) affectedDiscs = affectedDiscs.concat(directionAffectedDisks);

    directionAffectedDisks = [];

    return affectedDiscs;
  }

  private setDirectionAffectedDisks(directionAffectedDisks: DiskPosType[], row: number, col: number) {
    directionAffectedDisks.push({row: row, col: col});
  }

  private isMoveValid(row: number, col: number, player: 1 | 2): boolean {
    if (this.getBoard[row][col] !== 0) return false;
    if (this.getMoveAffectedDiscs(row, col).length === 0) return false;

    return true;
  }
  
  private canPlayerMove(player: 1 | 2): boolean {
    for (let i = 0; i < this.getColumns * this.getRows; i++) {
      const { row, col } = getPosition(i, this.getColumns);

      if (this.isMoveValid(row, col, player)) return true;
    }

    return false;
  }

  private updateTurnView() {
    this.turnElement.textContent = this.player === 1 ? "Black's turn" : "White's turn";
  }

  private addClickableSquares(): void {
    const squareElements = document.getElementsByClassName("square");

    for (let i = 0; i < squareElements.length; i++) {
      const {row, col} = getPosition(i, this.getColumns);

      squareElements[i].addEventListener("click", () => this.onSquareClick(row, col));
    }
  }

  private flipDiscs(affectedDiscs: DiskPosType[]): void {
    let board = this.getBoard;
    for (let disc of affectedDiscs) {
      board[disc.row][disc.col] = this.player;
    }

    this.setBoard = board;
  }

  private onSquareClick(row: number, col: number): void {
    if (this.finished) {
      alert("Game is finished");
      return;
    }
    if (!this.isMoveValid(row, col, this.player)) return;

    this.getBoard[row][col] = this.player;
    this.flipDiscs(this.getMoveAffectedDiscs(row, col));
    this.drawDiscs(this.getBoard, 8, 8);
    this.score.updateScores(this.getDiscsAmount(2), this.getDiscsAmount(1));

    if (this.player === 1 && this.canPlayerMove(2)) this.player = 2;
    else if (this.player === 2 && this.canPlayerMove(1)) this.player = 1;
    else this.finished = true;

    this.updateTurnView();
  }

  get getPlayer() {
    return this.player;
  }

  set setPlayer(player: 1 | 2) {
    this.player = player;
  }

  get isFinished() {
    return this.finished;
  }

  set setFinished(finished: boolean) {
    this.finished = finished;
  }
}

export default Game;