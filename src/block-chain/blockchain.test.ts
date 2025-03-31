import Block from "../block/block.ts";
import Blockchain from "./blockchain.ts";

describe("Blockchain ", function () {
  let blockchain: Blockchain;
  let newChain: Blockchain;
  let originalChain: Block[];
  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();
    originalChain = blockchain.chain;
  });
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

  /**
   * Validation BlockChain class
   * */
  describe("IsValidChain method() ", function () {
    /***/
    describe("when  the chain does not start with the genesis block", function () {
      it("should return false", () => {
        blockchain.chain[0] = {
          data: "fake genesis",
          hash: "",
          lastHash: "",
          timestamp: "",
        };
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
    /***/
    describe("when  the chain does  start with the genesis block and has multiple blocks", function () {
      beforeEach(() => {
        blockchain.addBlock({ data: "one" });
        blockchain.addBlock({ data: "two" });
        blockchain.addBlock({ data: "three" });
      });

      describe("and lastHash reference has changed", function () {
        it("should return false", () => {
          // @ts-ignore
          blockchain.chain[2].lastHash = " broken-lastHash";

          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain contains a block with invalid field  ", function () {
        it("should return false", () => {
          // @ts-ignore
          blockchain.chain[2].data = " changed data ";
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });

      describe("and the chain does not contain any invalid blocks ", function () {
        it("should return true", () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
  /**
   * ReplaceChain for BlockChain class
   * */
  describe("replace Chain method()", function () {
    describe("when the new chain is not longer", function () {
      it("should does not replace the chain", () => {
        newChain.chain[0] = {
          data: "s",
          hash: "",
          lastHash: "s",
          timestamp: "",
        };
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });
    describe("when the new chain is not longer", function () {
      it("should does not replace the chain", () => {
        newChain.chain[0] = {
          data: "s",
          hash: "",
          lastHash: "s",
          timestamp: "",
        };
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe("when the new chain is longer", function () {
      beforeEach(() => {
        newChain.addBlock({ data: "one" });
        newChain.addBlock({ data: "two" });
        newChain.addBlock({ data: "three" });
      });
      describe("validation chain is invalid", function () {
        it(" does not replace the chain", () => {
          if (newChain.chain[2]) newChain.chain[2].hash = "fake-hash";
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });
      describe("validation chain is valid", function () {
        it(" ⭕does replace the chain", () => {
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(newChain.chain);
        });
      });
    });
  });
});
