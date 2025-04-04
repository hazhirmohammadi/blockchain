import Blockchain from "./block-chain/blockchain.ts";

const blockChain = new Blockchain();

blockChain.addBlock({
  data: "initial Block",
});

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, avrage;

const times: any[] = [];

for (let i = 0; i < 100; i++) {
  prevTimestamp = blockChain.chain[blockChain.chain.length - 1]?.timestamp;
  blockChain.addBlock({ data: `block--${i}` });
  nextBlock = blockChain.chain[blockChain.chain.length - 1];
  nextTimestamp = nextBlock?.timestamp;

  // @ts-ignore
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  avrage = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block: ${timeDiff}ms. Difficulty:${nextBlock?.difficulty}. Average: ${Math.round(avrage)}ms`,
  );
  if (i==10){
    break
  }
}
