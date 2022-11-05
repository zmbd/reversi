import type { DiskPosInterface } from "../types/interface";

class Reversi {
  private _board: number[][];
  private _turn: 1 | 2;
  private _finished: boolean;

  private _turnEl: HTMLElement | null;
  private _boardEl: HTMLElement | null;
  private _blackScoreEl: HTMLElement | null;
  private _whiteScoreEl: HTMLElement | null;


  constructor(board: number[][]) {
    this._turn = 1;
    this._board = board;
    this._finished = false;
    this._boardEl = document.getElementById("board");
    this._turnEl = document.getElementById("current-turn");
    this._blackScoreEl = document.getElementById("black");
    this._whiteScoreEl = document.getElementById("white");
    this._turnEl && (this._turnEl.textContent = (this._turn === 1 ? ("Black") : ("White")));
    this._blackScoreEl && (this._blackScoreEl.textContent = "2");
    this._whiteScoreEl && (this._whiteScoreEl.textContent = "2");
    this.drawBoard();
  }

  drawBoardSquares() {
    let square = null;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        square = document.createElement("div");
        square.classList.add("square");
        square.style.left = `${(50 + 3) * j + 3}px`;
        square.style.top = `${(50 + 3) * i + 3}px`;
        square.addEventListener("click", () => this.boardClick(i, j));
        this._boardEl && this._boardEl.appendChild(square);
      }
    }
  }

  updateScores(): void {
    let blackScore = 0, whiteScore = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this._board[i][j] === 1 && blackScore++;
        this._board[i][j] === 2 && whiteScore++;
      }
    }

    this._blackScoreEl && (this._blackScoreEl.textContent = blackScore.toString());
    this._whiteScoreEl && (this._whiteScoreEl.textContent = whiteScore.toString());
  }

  isAbleToMove(player: 1 | 2): boolean {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.isValidMove(i, j, player)) return true;
      }
    }

    return false;
  }

  boardClick(i: number, j: number) {
    if (this.isValidMove(i, j, this._turn) && !this._finished) {
      this._board[i][j] = this._turn;
      this.flipDiscs(this.getAffectedDiscs(i, j, this._turn));
      this.drawBoardDiscs();
      if (this._turn === 1 && this.isAbleToMove(2)) {
        this._turn = 2;
      }
      else if (this._turn === 2 && this.isAbleToMove(1)) {
        this._turn = 1;
      }
      else this._finished = true;

      this.updateScores();
      this._turnEl && (this._turnEl.textContent = (this._turn === 1 ? ("Black") : ("White")));
    }
  }


  flipDiscs(affectedDiscs: DiskPosInterface[]): void {
    affectedDiscs.forEach((disc: DiskPosInterface) => {
      this._board[disc.i][disc.j] = this._turn;
    });
  }

  isValidMove(i: number, j: number, player: 1 | 2): boolean {
    if (this._board[i][j] !== 0) return false;
    if (this.getAffectedDiscs(i, j, player).length === 0) return false;

    return true;
  }

  setDirectionAffectedDisks(directionAffectedDisks: DiskPosInterface[], row: number, col: number): void {
    directionAffectedDisks.push({i: row, j: col});
  }

  getAffectedDiscs(i: number, j: number, player: 1 | 2) {
    let affectedDiscs: DiskPosInterface[] = [];
    let directionAffectedDisks: DiskPosInterface[] = [];
    let col, row;
    col = j;
    row = i;

    // check to the left

    while (col > 0) {
      col--;

      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }

      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);

    }

    //check to the right
    directionAffectedDisks = [];
    row = i;
    col = j;
    while (col < 7) {
      col++;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }

      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);

    }

    //check up
    directionAffectedDisks = [];
    row = i;
    col = j;

    while (row > 0) {
      row--;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }

      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);

    }

    //check down
    row = i;
    col = j;
    directionAffectedDisks = [];

    while (row < 7) {
      row++;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }

      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);

    }

    //diagonal up left
    row = i;
    col = j;
    directionAffectedDisks = [];
    while (row > 0 && col > 0) {
      row--; col--;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }
      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);
    }

    //diagonal up right
    row = i;
    col = j;
    directionAffectedDisks = [];
    while (row > 0 && col < 7) {
      row--; col++;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }
      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);
    }

    //diagonal down left
    row = i;
    col = j;
    directionAffectedDisks = [];
    while (row < 7 && col > 0) {
      row++; col--;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }
      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);
    }

    //diagonal down right
    row = i;
    col = j;
    directionAffectedDisks = [];
    while (row < 7 && col < 7) {
      row++; col++;
      if (this._board[row][col] === player || this._board[row][col] === 0) {
        this._board[row][col] === player && (affectedDiscs = affectedDiscs.concat(directionAffectedDisks));
        break;
      }
      else this.setDirectionAffectedDisks(directionAffectedDisks, row, col);
    }

    return affectedDiscs;
  }
  
  drawBoardDiscs() {
    let disc = null;
    let square: HTMLElement | null;

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        square = document.querySelector(`.square:nth-child(${i * 8 + j + 1})`);
        if (!square) break;
        console.log(square.getElementsByClassName("disc")[0])
        if (square.getElementsByClassName("disc")[0]) {
          console.log(square.getElementsByClassName("disc")[0]);
          square.removeChild(square.getElementsByClassName("white")[0] || square.getElementsByClassName("black")[0]);
        }
        disc = square.appendChild(document.createElement("div"));
        if (this._board[i][j] === 1) {
          disc.classList.add("disc", "black");
        } else if (this._board[i][j] === 2) {
          disc.classList.add("disc", "white");
        }
        disc.style.left = `${(50 + 3) * j + 3}px`;
        disc.style.top = `${(50 + 3) * i + 3}px`;
      }
    }
  }

  drawBoard() {
    this.drawBoardSquares();
    this.drawBoardDiscs();
  }

  get board() {
    return this._board;
  }
  set board(board) {
    this._board = board;
  }
  get boardElement() {
    return this._boardEl;
  }
  set boardElement(boardEl) {
    this._boardEl = boardEl;
  }

}

function init() {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const reversi: Reversi = new Reversi(board);

  const boardElement = reversi.boardElement;

  boardElement && boardElement.addEventListener("click", () => {
    reversi.drawBoardDiscs();
  });
}

window.onload = init;
