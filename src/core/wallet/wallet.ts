import { STARTING_BALANCE } from "./config.ts";
const secp256k1 = require("../utils/elliptic.ts");
import type { IWallet } from "./wallet.type.ts";
import cryptoHash from "../utils/crypto-hash/crypto-hash.ts";

class Wallet implements IWallet {
  private readonly keyPair = secp256k1.genKeyPair();
  public startingBalance = STARTING_BALANCE;
  public publicKey: string;

  constructor() {
    this.publicKey = this.keyPair.getPublic().encode("hex", false);
  }

  public sign(data: any) {
    const hashData = cryptoHash(data);
    return this.keyPair.sign(hashData);
  }
}

export default Wallet;
