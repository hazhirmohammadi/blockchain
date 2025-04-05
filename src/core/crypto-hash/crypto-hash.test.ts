import cryptoHash from "./crypto-hash.ts";

describe("Crypto", function () {
  it("generate a `SHA-256` hashed output  ", () => {
    expect(cryptoHash("cryptoHash")).toEqual(
      "1867520cd1f8be44e3b3d5bb11f75820667541b905c851e280deda4ce55180d0",
    );
  });

  it("produces the same hash with  the same input in any order   ", () => {
    expect(cryptoHash("one", "two", "three")).toEqual(
      cryptoHash("one", "three", "two"),
    );
  });
});
//