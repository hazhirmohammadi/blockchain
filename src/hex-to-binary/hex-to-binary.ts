function hexToBinary(hex: string): string {
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error("Invalid hexadecimal input");
  }
  let binary = BigInt(`0x${hex}`).toString(2);
  return binary.padStart(hex.length * 4, "0");
}

export default hexToBinary;
