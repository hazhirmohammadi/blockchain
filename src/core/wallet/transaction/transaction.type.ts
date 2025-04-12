import type Wallet from "../wallet.ts";
import type { ec } from "elliptic";

type Signature = ec.Signature;

export interface ITransaction {
  senderWallet: Wallet;
  recipient: string;
  amount: number;
}

export interface ICreateInputParams {
  senderWallet: Wallet;
  outputMap: Record<string, number>;
}

export interface ICreateInput {
  timestamp: number;
  amount: number;
  address: string;
  signature: Signature;
}
