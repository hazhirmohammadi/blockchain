import Redis from "ioredis";

const CHANELS = {
  TEST: "TEST",
};

class PubSub {
  public publisher: Redis;
  public subscriber: Redis;

  constructor() {
    this.publisher = new Redis();
    this.subscriber = new Redis();

    this.subscriber.subscribe(CHANELS.TEST);

    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }

  public handleMessage(channel: string, message: string) {
    console.log(`message: ${message}, at channel: ${channel}`);
  }
}

export default PubSub;

const pubsub = new PubSub();

setTimeout(() => {
  pubsub.publisher.publish(CHANELS.TEST, "foo");
}, 1000);
