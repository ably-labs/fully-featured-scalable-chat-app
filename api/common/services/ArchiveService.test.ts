import { setBlobContents, clearStorageBlobs, blobStorage } from "../../test-helpers/FakeAzureBlobStorageArchiveDataRepository";
import { ArchiveService } from "./ArchiveService";

describe("Archive Service", () => {
  let sut: ArchiveService;
  beforeEach(() => {
    clearStorageBlobs();
    sut = new ArchiveService();
  });

  it("append, provided fist message, creates .json file matching channelName", async () => {
    await sut.append("foo", { foo: "bar" });
    expect(blobStorage.get("foo.json")).toBeDefined();
  });

  it("append, provided fist message, creates .json file matching channelName", async () => {
    await sut.append("foo", { foo: "bar" });
    const buffer = blobStorage.get("foo.json");
    expect(buffer).toBeInstanceOf(Buffer);
  });

  it("append, provided fist message, serializes object data into blob", async () => {
    const someMessage = { foo: "bar" };

    await sut.append("foo", someMessage);

    const dataAsText = blobStorage.get("foo.json").toString();
    expect(dataAsText).toContain(`{"foo":"bar"}`);
  });

  it("append, provided multiple messages, seperates messages with ASCII 30 'Record Separator' control code", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}`);

    await sut.append("foo", { foo: "bar2" });

    const dataAsText = blobStorage.get("foo.json").toString();
    expect(dataAsText).toContain(`{"foo":"bar1"}${RS}{"foo":"bar2"}`);
  });

  it("getTail, archive data is smaller than a single buffer full, returns entire archive as item array", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}`);

    const { messages } = await sut.getTail("foo");

    expect(messages[0].foo).toEqual("bar1");
  });

  it("getTail, archive data is smaller than a single buffer max-size, returns entire archive as item array", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}`);

    const { messages } = await sut.getTail("foo");

    expect(messages[0].foo).toEqual("bar1");
  });

  it("getTail, archive has multiple items and is smaller than single buffer max-size, returns entire archive as item array", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}${RS}{"foo":"bar2"}`);

    const { messages } = await sut.getTail("foo");

    expect(messages[0].foo).toEqual("bar1");
    expect(messages[1].foo).toEqual("bar2");
  });

  it("getTail, archive has multiple items and is bigger than single buffer, but over-reads, returns only last item", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}${RS}{"foo":"bar2"}`);

    const { messages } = await sut.getTail("foo", 0, 16);

    expect(messages.length).toEqual(1);
    expect(messages[0].foo).toEqual("bar2");
  });

  it("getTail, archive has multiple items and is bigger than single buffer, but over-reads, returns position for next call", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}${RS}{"foo":"bar2"}`);

    const { position } = await sut.getTail("foo", 0, 16);
    expect(position).toEqual(15);

    const subsequentResult = await sut.getTail("foo", position, 16);

    expect(subsequentResult.messages.length).toEqual(1);
    expect(subsequentResult.messages[0].foo).toEqual("bar1");
  });

  it("readHistory, archive has items, iterates over them in batches, in reverse", async () => {
    setBlobContents("foo.json", `{"foo":"bar1"}${RS}{"foo":"bar2"}`);
    const received = [];

    for await (const { messages } of sut.readHistory("foo", 0, 16)) {
      received.push(...messages);
    }

    expect(received.length).toEqual(2);
  });
});

const RS = String.fromCharCode(30);
