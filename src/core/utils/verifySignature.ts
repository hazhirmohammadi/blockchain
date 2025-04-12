const secp256k1 = require("../utils/elliptic");
import cryptoHash from "./crypto-hash/crypto-hash.ts";
import type { ec } from "elliptic";
type Signature = ec.Signature;


interface verifySignature {
  publicKey: string;
  data: any;
  signature: Signature;
}

export const verifySignature = ({ publicKey, data, signature }:verifySignature) => {
  const keyFromPublic = secp256k1.keyFromPublic(publicKey, "hex");
  const hashData = cryptoHash(data);
  return keyFromPublic.verify(hashData, signature);
};
