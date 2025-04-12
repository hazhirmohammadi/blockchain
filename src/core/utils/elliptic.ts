import { createRequire } from "module";
const require = createRequire(import.meta.url);
const elliptic = require("elliptic");

const EC = elliptic.ec;
const secp256k1 = new EC("secp256k1");

export const secp = secp256k1;
