// TODO: fix this error in tests
const elliptic = require("elliptic").ec;

const secp256k1 = new elliptic("secp256k1");

module.exports = secp256k1;
