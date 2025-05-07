import type Wallet from "../wallet.ts";
import { v1 } from "uuid";
import { verifySignature } from "../../utils/verifySignature.ts";
import type {
  ICreateInput,
  ICreateInputParams,
  ITransaction,
} from "./transaction.type.ts";

class Transaction implements ITransaction {
  public readonly id: string = v1();
  public outputMap: Record<string, number>;
  public input: ICreateInput;
  public senderWallet: Wallet;
  public recipient: string;
  public amount: number;

  constructor({ senderWallet, recipient, amount }: ITransaction) {
    this.senderWallet = senderWallet;
    this.recipient = recipient;
    this.amount = amount;

    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  public createOutputMap({ senderWallet, recipient, amount }: ITransaction) {
    const outputMap: Record<string, number> = {} as Record<string, number>;
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  public createInput({
    senderWallet,
    outputMap,
  }: ICreateInputParams): ICreateInput {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }

  static validTransaction(transaction: Transaction): boolean {
    const {
      outputMap,
      input: { address, amount, signature },
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, outputAmount) => total + outputAmount,
    );

    if (amount !== outputTotal) {
      console.error(`invalid transaction from: ${address}`);
      return false;
    }

    if (
      !verifySignature({
        publicKey: address,
        data: outputMap,
        signature: signature,
      })
    ) {
      console.error(`invalid transaction signature from: ${address}`);
      return false;
    }

    return true;
  }
}

export default Transaction;
