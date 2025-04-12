import Transaction from "./transaction.ts";
import Wallet from "../wallet.ts";

describe("Transaction class", function () {
  let transaction: Transaction;
  let senderWallet: Wallet;
  let recipient: string;
  let amount: number;

  beforeEach(() => {
    senderWallet = new Wallet();
    recipient = "recipient-public-key";
    amount = 50;
    transaction = new Transaction({ senderWallet, recipient, amount });
  });

  it("has an `id` ", () => {
    expect(transaction).toHaveProperty("id");
  });

  describe("output Map", function () {
    it("has an `output map`", () => {
      expect(transaction).toHaveProperty("outputMap ");
    });
    it("outputs the amount to the recipient", () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });
    it("outputs the remaining balance for the sender wallet", () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
        senderWallet.balance - amount,
      );
    });
  });
});
