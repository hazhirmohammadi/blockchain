import cryptoHash from "./crypto-hash/crypto-hash.ts";
import type { ec } from "elliptic";
import { secp } from "./elliptic.ts";

type Signature = ec.Signature;

interface verifySignature {
  publicKey: string;
  data: any;
  signature: Signature;
}

export const verifySignature = ({
  publicKey,
  data,
  signature,
}: verifySignature) => {
  const keyFromPublic = secp.keyFromPublic(publicKey, "hex");
  const hashData = cryptoHash(data);
  return keyFromPublic.verify(hashData, signature);
};
