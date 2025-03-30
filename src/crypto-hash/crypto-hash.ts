import * as crypto from "node:crypto";

const cryptoHash = (...inputs: any[]) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputs.join(" "));
  return hash.digest("hex");
};
export default cryptoHash;
