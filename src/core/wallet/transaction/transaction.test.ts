import Transaction from "./transaction.ts";
import Wallet from "../wallet.ts";
import { verifySignature } from "../../utils/verifySignature.ts";

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
      expect(transaction).toHaveProperty("outputMap");
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

  describe("input", function () {
    it("has an `input`", () => {
      expect(transaction).toHaveProperty("input");
    });

    it("has an `timestamp` in the input", () => {
      expect(transaction.input).toHaveProperty("timestamp");
    });

    it("sets the `amount` to `senderWallet` balance", () => {
      expect(transaction.input.amount).toEqual(senderWallet.balance);
    });

    it("sets the `address` to the `senderWallet` publicKey", () => {
      expect(transaction.input.address).toEqual(senderWallet.publicKey);
    });

    it("sings the input", () => {
      expect(
        verifySignature({
          publicKey: senderWallet.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        }),
      ).toBe(true);
    });
  });

  describe("valid transaction method()", function () {
    describe("when the transaction is valid", function () {
      it("return a true ", () => {
        expect(Transaction.validTransaction(transaction)).toBe(true);
      });
    });

    describe("when the transaction is invalid", function () {
      describe("and a transaction outputMap value is invalid", function () {
        it("return false ", () => {
          transaction.outputMap[senderWallet.publicKey] = 9999;
          expect(Transaction.validTransaction(transaction)).toBe(false);
        });
      });

      describe("and a transaction input signature value is invalid ", function () {
        it("return false ", () => {
          transaction.input.signature = new Wallet().sign("hack data");
          expect(Transaction.validTransaction(transaction)).toBe(false);
        });
      });
    });
  });
});
