//定义一个区块类，定义此区块链中每个区块的数据结构
class Block {    
//构造函数-创建一个新的区块链对象
  constructor(index, previousHash, timestamp, data, hash, nonce) {
        this.index = index;  //区块索引
        this.previousHash = previousHash; //前一个区块的hash值
        this.timestamp = timestamp; //时间戳
        this.data = data;//区块数据
        this.hash = hash;//区块的hash值
        this.nonce = nonce; //随机数
    }

    static get genesis() {
        return new Block(
            0,
            "0",
            1508270000000,
            "first block",
            "000dc75a315c77a1f9c98fb6247d03dd18ac52632d7dc6a9920261d8109b37cf",
            604
        )
    }
}

module.exports = Block;