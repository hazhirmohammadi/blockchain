class Block {
    data: string;
    hash: string;
    lastHash: string;

    constructor(data: string, hash: string, lastHash: string) {
        this.data = data;
        this.hash = hash;
        this.lastHash = lastHash;
    }
}

const hashFunc = (input: string): string => {
    return '*' + input + "*"
}

class BlockChain {
    chain: Block[]

    constructor() {
        const genesis = new Block("gen-data", "hash1", "gen-lastHash")
        this.chain = [genesis]
    }

    addBlock(data: string) {
        const lastHash: string = this.chain.length > 0 ? this.chain[this.chain.length - 1]!.hash : "null";
        const hash: string = hashFunc(data + lastHash)
        const newBlock = new Block(data, hash, lastHash)
        this.chain.push(newBlock)
    }
}

const fooBlockChain = new BlockChain()

fooBlockChain.addBlock("one")
fooBlockChain.addBlock("tow")
fooBlockChain.addBlock("tree")
console.log(fooBlockChain)