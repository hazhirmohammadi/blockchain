import type Wallet from "../wallet.ts";

export interface ITransaction {
    senderWallet: Wallet;
    recipient: string;
    amount: number;
}