import Blockchain from "./block-chain/blockchain.ts";
import block from "./block/block.ts";

class AverageWork extends Blockchain {
  constructor() {
    super();
  }

 public calculateAverageWork(): void {
    const times: number[] = [];
    let prevTimestamp: number | undefined;
    let nextTimestamp: number | undefined;
    let nextBlock: any;
    let timeDiff: number;
    let average: number;

    this.addBlock({ data: "Initial Block" });
     console.log("first Block 📒:",this.chain[this.chain.length-1])
    for (let i = 0; i < 100; i++) {
      prevTimestamp = this.chain[this.chain.length - 1]?.timestamp;
      this.addBlock({ data: `block--${i}` });
      nextBlock = this.chain[this.chain.length - 1];
      nextTimestamp = nextBlock?.timestamp;

      if (prevTimestamp !== undefined && nextTimestamp !== undefined) {
        timeDiff = nextTimestamp - prevTimestamp;
        times.push(timeDiff);
        average = times.reduce((total, num) => total + num, 0) / times.length;

        console.log(
          `Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock?.difficulty}. Average: ${Math.round(average)}ms`,
        );
      }

    }
  }

}

const averageWork = new AverageWork();
averageWork.calculateAverageWork();
