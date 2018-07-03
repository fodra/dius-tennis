import Match from '../Match';

describe("Match tests", () => {

  it("should create a match object", () => {
    let match = new Match("p1", "p2");
    expect(match.currentSet).toBe(1);
  });

});