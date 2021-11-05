import { default as Chat } from "./index";

describe("A", () => {
  it("Chat", () => {
    const result = Chat();

    expect(result).toBeDefined();
  });
});
