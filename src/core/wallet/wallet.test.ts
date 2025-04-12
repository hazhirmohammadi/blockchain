import Wallet from "./wallet.ts";
import {verifySignature} from "../utils/verifySignature.ts";

// TODO: fix error test
describe("Wallet class", function () {
  let wallet: Wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });
  it("has a `balance` property ", () => {
    expect(wallet).toHaveProperty("balance");
  });

  it("has a `publicKey` property ", () => {
    expect(wallet).toHaveProperty("publicKey");
  });
  describe("Singing data", function () {
    const data = "some-data";
    it("verifier a signature ", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        }),
      ).toBe(true);
    });

    it("dos not verify an invalid  signature   ", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        }),
      ).toBe(false);
    });
  });
});
