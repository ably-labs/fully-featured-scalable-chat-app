import { default as Chat } from "./ChatContainer";

describe("A", () => {
  it("Chat", () => {
    const result = Chat();

    expect(result).toBeDefined();
  });
});
