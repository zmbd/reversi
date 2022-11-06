import Board from "./Board";

class Score {
  private white = 2;
  private black = 2;
  private blackScoreElement: HTMLElement = document.createElement("h2");
  private whiteScoreElement: HTMLElement = document.createElement("h2");

  constructor() {
    document.querySelector("#black-score")?.appendChild(this.blackScoreElement);
    document.querySelector("#white-score")?.appendChild(this.whiteScoreElement);
    this.blackScoreElement.textContent = this.black.toString();
    this.whiteScoreElement.textContent = this.white.toString();
  }

  public updateScores(white: number, black: number): void {
    this.setWhite = white;
    this.setBlack = black;

    this.whiteScoreElement.textContent = this.white.toString();
    this.blackScoreElement.textContent = this.black.toString();
  }

  get getWhite() {
    return this.white;
  }

  set setWhite(white: number) {
    this.whiteScoreElement.textContent = white.toString();
    this.white = white;
  }

  get getBlack() {
    return this.black;
  }

  set setBlack(black: number) {
    this.blackScoreElement.textContent = black.toString();
    this.black = black;
  }
}

export default Score;