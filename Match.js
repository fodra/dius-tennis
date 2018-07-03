'use strict';

export default class Match {

  constructor(player1, player2) {
    this.scoreBoard = {};
    this.POINT = {
      0: "LOVE",
      1: "15",
      2: "30",
      3: "40",
      4: "GAME"
    }
    this.currentSet = 1;
  }

  /**
   * Displays the current score of the tennis match
   */
  score() {

  }

  /**
   * Records a point made by a player
   * @param {string} player - who scored the point
   */
  pointWonBy(player) {

  }
}