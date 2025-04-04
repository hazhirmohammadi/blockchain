import Block from "./block.ts";
import { GENESIS_DATA, MINE_RATE } from "./config.ts";
import cryptoHash from "../crypto-hash/crypto-hash.ts";
import hexToBinary from "../hex-to-binary/hex-to-binary.ts";

/**
 * Block Test
 * */
describe("Block class", function () {
  /**
   * Fake Data
   * */
  const timestamp: string = "2000";
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
      expect(
        hexToBinary(mineBlock.hash).substring(0, mineBlock.difficulty),
      ).toEqual("0".repeat(mineBlock.difficulty));
    });

    it("a just difficulty", () => {
      const possibleResults: Array<number> = [
        lastBlock.difficulty + 1,
        lastBlock.difficulty - 1,
      ];
      expect(possibleResults.includes(mineBlock.difficulty)).toBe(true);
    });
  });

  describe("A just difficulty method()", function () {
    it("raises the difficulty for a quickly mine block ", () => {
      expect(
        Block.aJustDifficulty({
          originalBlock: block,
          timestamp: Number(block.timestamp) + MINE_RATE - 100,
        }),
      ).toEqual(block.difficulty + 1);
    });
    it("lowers the difficulty for a  slowly mine block ", () => {
      expect(
        Block.aJustDifficulty({
          originalBlock: block,
          timestamp: Number(block.timestamp) + MINE_RATE + 100,
        }),
      ).toEqual(block.difficulty - 1);
    });
    it("has lower limit of 1 ", () => {
      block.difficulty = -1;
      expect(Block.aJustDifficulty({ originalBlock: block }));
    });
  });
});
