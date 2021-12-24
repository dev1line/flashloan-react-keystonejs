const ethers = require('ethers')
const wallet = ethers.Wallet.createRandom()

console.log('address:', wallet.address)
console.log('mnemonic:', wallet.mnemonic.phrase)
console.log('privateKey:', wallet.privateKey)


// address: 0x5f60179522a5ADfD4c1f7FDf3F6aebABE74ac695
// mnemonic: thought quote question vicious alcohol hidden chicken drop leopard flavor silk park
// privateKey: 0xec1e1109e0aa9dafc8961bce3b60c1fde5657ad57efe7c474da2cb0cecdfdfbf