import Match from '../Match';

describe("Match tests", () => {

  let match = null;
  let result = null;
  let winGames = ((match, player, games) => {
    for (let i=0; i < games; i++) {
      match.pointWonBy(player);
      match.pointWonBy(player);
      match.pointWonBy(player);
      match.pointWonBy(player);
    }
  });

  let winTieBreak = ((match, player) => {
    // Needs 7 points to win the tie break
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
    match.pointWonBy(player);
  });

  beforeEach(() => {
    match = new Match("p1", "p2");
  });

  it("should not display the points", () => {
    result = match.score();
    expect(result.includes(',')).toBe(false);
  });

  it("should display game and points score", () => {
    match.pointWonBy("p1");
    result = match.score();
    expect(result.includes(',')).toBe(true);
    expect(result).toBe("0-0, 15-0");
    match.pointWonBy("p1");
    result = match.score();
    expect(result).toBe("0-0, 30-0");
    match.pointWonBy("p1");
    result = match.score();
    expect(result).toBe("0-0, 40-0");
    match.pointWonBy("p1");
    result = match.score();
    expect(result.includes(',')).toBe(false);
    expect(result).toBe("1-0");
  });

  it("should display deuce when both players have atleast 3 points and have the same number of points", () => {
    match.pointWonBy("p1");
    match.pointWonBy("p1");
    match.pointWonBy("p1");

    match.pointWonBy("p2");
    match.pointWonBy("p2");
    match.pointWonBy("p2");

    result = match.score();
    expect(result.includes(',')).toBe(true);
    expect(result).toBe("0-0, Deuce");

  });

  it("should display advantage for the player who scored at least 3 points and ahead of the other player", () => {
    match.pointWonBy("p1");
    match.pointWonBy("p1");
    match.pointWonBy("p1");

    match.pointWonBy("p2");
    match.pointWonBy("p2");
    match.pointWonBy("p2");

    result = match.score();
    expect(result.includes(',')).toBe(true);
    expect(result).toBe("0-0, Deuce");

    match.pointWonBy("p2");
    result = match.score();
    expect(result).toBe("0-0, Advantage p2");
  });

  it("should detect a player has won the set", () => {
    winGames(match, "p1", 3);
    winGames(match, "p2", 6);

    result = match.score();
    expect(result).toBe("3-6");
  });

  it("should detect a tie break", () => {
    winGames(match, "p1", 5);
    winGames(match, "p2", 5);
    winGames(match, "p1", 1);
    winGames(match, "p2", 1);

    result = match.score();
    expect(result).toBe("6-6");
    expect(match.isTieBreak).toBe(true);
  });

  it("should simulate a set won in a tie break", () => {
    winGames(match, "p1", 5);
    winGames(match, "p2", 5);
    winGames(match, "p1", 1);
    winGames(match, "p2", 1);

    result = match.score();
    expect(result).toBe("6-6");
    expect(match.isTieBreak).toBe(true);
    winTieBreak(match, "p2");
    result = match.score();
    expect(result).toBe("6-7");
    expect(match.isTieBreak).toBe(false);
  });

});

