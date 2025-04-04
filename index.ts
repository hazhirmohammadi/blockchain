import Block from "./src/block/block.ts";
import cryptoHash from "./src/crypto-hash/crypto-hash.ts";

const blockChain = new Block({
  timestamp: "880",
  lastHash: "sdwe",
  data: "q2q",
  hash: "swew",
});
console.log(blockChain);
