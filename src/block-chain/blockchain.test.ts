import Block from "../block/block.ts";
import Blockchain from "./blockchain.ts";

describe("Blockchain ", function () {
  let blockchain = new Blockchain();

  beforeEach(() => {
    blockchain = new Blockchain();
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
   * Validation BlockChain
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
});
