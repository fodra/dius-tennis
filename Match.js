'use strict';

class Player {

  constructor(name) {
    this.name = name;
    this.pointsWon = 0;
    this.gamesWon = 0;
  }

  pointWon(name) {
    if (this.name === name) {
      this.pointsWon++;
    }
  }

  resetPoints() {
    this.pointsWon = 0;
  }

  gameWon() {
    this.gamesWon++;
  }

  show() {
    console.log(`${this.name} Games won ${this.gamesWon}, Points won ${this.pointsWon}`);
  }
}

export default class Match {

  constructor(player1, player2) {
    this.playerOne = new Player(player1);
    this.playerTwo = new Player(player2);
    this.isTieBreak = false;
    this.scoreBoard = [];

    this.TENNIS_POINT = {
      0: "0",
      1: "15",
      2: "30",
      3: "40",
      4: "GAME"
    }
    this.currentSet = 1;
  }

  /**
   * Returns the players sorted by the pointsWon in ascending order
   */
  getPlayersByPoints() {
    return [this.playerOne, this.playerTwo].sort((a, b) => a.pointsWon - b.pointsWon);
  }

  /**
   * Returns the players sorted by the gamesWon in ascending order
   */
  getPlayersByGames() {
    return [this.playerOne, this.playerTwo].sort((a, b) => a.gamesWon - b.gamesWon);
  }

  /**
   * Returns a string representation of the score in tennis lingo.
   */
  getTennisPoint() {
    let playerOnePoints = this.playerOne.pointsWon;
    let playerTwoPoints = this.playerTwo.pointsWon;

    if (this.isTieBreak) {
      return `, ${playerOnePoints}-${playerTwoPoints}`;
    }

    if (playerOnePoints >= 3 && playerOnePoints === playerTwoPoints) {
      return `, Deuce`;
    }

    if (playerOnePoints >= 3 && playerTwoPoints >= 3) {
      let players = this.getPlayersByPoints();
      let leading = players.pop();
      return `, Advantage ${leading.name}`;
    }

    return `, ${this.TENNIS_POINT[playerOnePoints]}-${this.TENNIS_POINT[playerTwoPoints]}`;
  }

  /**
   * Displays the current score of the tennis match
   */
  score() {
    let player1Points = this.playerOne.pointsWon;
    let player2Points = this.playerTwo.pointsWon;
    let player1Games = this.playerOne.gamesWon;
    let player2Games = this.playerTwo.gamesWon;

    let showPlayerPoints = !((player1Points === 0) && (player2Points === 0));

    let output = `${player1Games}-${player2Games}`;
    if (showPlayerPoints) {
      output += this.getTennisPoint(this.player);
    }
    return output;
  }

  /**
   * Updates the games stat applying the tennis rules.
   */
  updateGamesWon() {

    let players = this.getPlayersByPoints();
    let leading = players.pop();
    let trailing = players.pop();

    if (this.isTieBreak) {
      if (leading.pointsWon >= 7 && leading.pointsWon >= trailing.pointsWon + 2) {
        leading.gameWon();
        leading.resetPoints();
        leading.resetPoints();
      }
    } else {
      if (leading.pointsWon >= 4 && leading.pointsWon >= trailing.pointsWon + 2) {
        leading.gameWon();
        leading.resetPoints();
        trailing.resetPoints();
      }
    }

    players = this.getPlayersByGames();
    leading = players.pop();
    trailing = players.pop();

    if (leading.gamesWon >= 6) {

      if (this.isTieBreak) {
        if (leading.gamesWon == 7 && trailing.gamesWon == 6) {
          console.log(`Tie break won by ${leading.name}`);
          this.isTieBreak = false;
          return;
        }
      } else if (leading.gamesWon >= trailing.gamesWon + 2) {
        console.log(`${leading.name} wins the set! ${leading.gamesWon}-${trailing.gamesWon}`);
        return;
      }
    }

    if (leading.gamesWon == 6 && leading.gamesWon === trailing.gamesWon) {
      this.isTieBreak = true;
      console.log(`Tie break is on!`);
    }
  }

  /**
   * Records a point made by a player
   * @param {string} player - who scored the point
   */
  pointWonBy(player) {
    // record the score
    this.playerOne.pointWon(player);
    this.playerTwo.pointWon(player);

    this.updateGamesWon();
  }
}
