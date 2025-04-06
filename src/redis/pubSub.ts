import Redis from "ioredis";
import Blockchain from "../core/block-chain/blockchain.ts";
import type { BlockData } from "../core/block/block.type.ts";

export enum Channels {
  TEST = "TEST",
  BLOCKCHAIN = "BLOCKCHAIN",
}

class PubSub {
  public publisher: Redis;
  public subscriber: Redis;
  public blockchain: Blockchain;

  constructor() {
    this.blockchain = new Blockchain();
    this.publisher = new Redis();
    this.subscriber = new Redis();

    this.subscribeToChannels();

    this.subscriber.on("message", (channel: Channels, message: string) => {
      this.handleMessage(channel, message);
    });
  }

  private subscribeToChannels() {
    Object.values(Channels).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  public publish({ channel, message }: { channel: Channels; message: string }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  public broadcastChain() {
    this.publish({
      channel: Channels.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  public handleMessage(channel: Channels, message: string) {
    const parseJson: BlockData[] = JSON.parse(message);

    if (channel === Channels.BLOCKCHAIN) {
      this.blockchain.replaceChain(parseJson);
    }
  }
}

export default PubSub;
