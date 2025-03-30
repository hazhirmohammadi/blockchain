import Block from "../block/block.ts";
import Blockchain from "./blockchain.ts";

describe("Blockchain ", function () {
  const blockchain = new Blockchain();

  it("contains a `chain Array instance ", () => {
    expect(blockchain.chain).toBeInstanceOf(Array);
  });
  it("starts with genesis block  ", () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });
  it("adds a new  block to the chain  ", () => {
    const newData: string = "foo bar";
    blockchain.addBlock({ data: newData });
    // @ts-ignore
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });
});
