import Block from "./block.ts";
import { GENESIS_DATA } from "./config.ts";

/**
 * Block Test
 * */
describe("Block class", function () {
  /**
   * Fake Data
   * */
  const timestamp: string = "a-data";
  const lastHash: string = "foo-hash";
  const hash: string = "hash-code";
  const data: string = "test-data ";

  const block = new Block({
    timestamp: timestamp,
    lastHash: lastHash,
    hash: hash,
    data: data,
  });
  /**
   * Input class
   * */
  it("has a timestamp ,lastHash ,hash ,data properties", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });

  /**
   * Genesis block test
   * */
  describe("Genesis method()", function () {
    const genesisBlock = Block.genesis();

    it("return a block instance", () => {
      expect(genesisBlock).toBeInstanceOf(Block);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  /**
   * MineBlock method test
   * */
  describe("MineBlock method()", function () {
    const lastBlock = Block.genesis();
    const data: string = "mined data ";
    const mineBlock = Block.mineBlock({ lastBlock, data });

    it("should return a block instance", () => {
      expect(mineBlock).toBeInstanceOf(Block);
    });

    it("sets the `lastHash` to the `hash` of the lastHash", () => {
      expect(mineBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data` ", () => {
      expect(mineBlock.data).toEqual(data);
    });

    it("sets the `timestamp` ", () => {
      expect(mineBlock.timestamp).not.toEqual(undefined);
    });
  });
});
