import Board from "./Board";

export class Game extends Board{
  private turn: 1 | 2;
  private finished: boolean;

  constructor(board: number[][]) {
    super(board);
    this.turn = 1;
    this.finished = false;
  }

  get getTurn() {
    return this.turn;
  }

  set setTurn(turn: 1 | 2) {
    this.turn = turn;
  }

  get isFinished() {
    return this.finished;
  }

  set setFinished(finished: boolean) {
    this.finished = finished;
  }
}

export default Game;