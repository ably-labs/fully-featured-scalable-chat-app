import autoScrollHistory from "./autoScrollHistory.js";

describe("auto scroll", () => {
  test("returns null with bad arguments", () => {
    // completely undefined
    expect(autoScrollHistory()).toBeNull();

    // correct 1st argument (Array)
    expect(autoScrollHistory([1])).toBeNull();

    // correct 2nd argument (Object)
    expect(autoScrollHistory(null, {})).toBeNull();
  });

  test("success: returns number of array elements", () => {
    const array = [1, 2, 3];
    const refrence = Object();

    expect(autoScrollHistory(array, refrence)).toBe(3);
  });
});
