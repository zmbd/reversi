abstract class DomElements {
  private boardElement = document.getElementById("board");
  private turnElement = document.getElementById("current-turn");
  private blackScoreElement = document.getElementById("black");
  private whiteScoreElement = document.getElementById("white");

  abstract appendChild(child: HTMLElement): void;
  abstract addEventListener(event: string, func: Function): void;
 
  get getBoardElement() {
    return this.boardElement;
  }

  get getTurnElement() {
    return this.turnElement;
  }

  get getBlackScoreElement() {
    return this.blackScoreElement
  }

  set setBlackScoreElement(blackScoreElement: HTMLElement) {
    this.blackScoreElement = blackScoreElement;
  }

  get getWhiteScoreElement() {
    return this.whiteScoreElement;
  }

  set setWhiteScoreElement(whiteScoreElement: HTMLElement) {
    this.whiteScoreElement = whiteScoreElement;
  }
}

export default DomElements;