import type Wallet from "../wallet.ts";
import { v1 } from "uuid";
import type {ITransaction} from "./transaction.type.ts";


class Transaction implements ITransaction {
  public readonly id: string = v1();
  public outputMap: Record<string, number>;
  public senderWallet: Wallet;
  public recipient: string;
  public amount: number;

  constructor({ senderWallet, recipient, amount }: ITransaction) {
    this.senderWallet = senderWallet;
    this.recipient = recipient;
    this.amount = amount;
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount });
  }

  public createOutputMap({ senderWallet, recipient, amount }: ITransaction) {
    const outputMap: Record<string, number> = {} as Record<string, number>;
    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }
}

export default Transaction;
