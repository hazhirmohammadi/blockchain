import Block from "./block.ts";
import { GENESIS_DATA } from "./config.ts";
import cryptoHash from "../crypto-hash/crypto-hash.ts";

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
  const difficulty: number = 1;
  const nonce: number = 1;

  const block = new Block({
    timestamp: timestamp,
    lastHash: lastHash,
    hash: hash,
    data: data,
    difficulty: difficulty,
    nonce: nonce,
  });
  /**
   * Input class
   * */
  it("has a timestamp ,lastHash ,hash ,data properties", () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.difficulty).toEqual(difficulty);
    expect(block.nonce).toEqual(nonce);
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

    it("create a SHA-256 `hash` based on the proper inputs ", () => {
      expect(mineBlock.hash).toEqual(
        cryptoHash(
          mineBlock.timestamp,
          mineBlock.difficulty,
          mineBlock.nonce,
          lastBlock.hash,
          data,
        ),
      );
    });
    it("sets a `hash` that maces the difficulty criteria", () => {
      expect(mineBlock.hash.substring(0, mineBlock.difficulty)).toEqual(
        "0".repeat(mineBlock.difficulty),
      );
    });
  });
});
