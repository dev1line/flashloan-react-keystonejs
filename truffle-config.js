const Dotenv = require("dotenv");
Dotenv.config({ path: `${__dirname}/.env` });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(
    __dirname,
    "front-end-reactjs/src/config/abi"
  ),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    kovan: {
      provider: new HDWalletProvider(
        process.env.MNEMONIC,
        "https://kovan.infura.io/v3/" + process.env.PROJECT_ID
      ),
      network_id: 42,
      gas: 5000000,
      gasPrice: 5000000000, // 5 Gwei
      skipDryRun: true,
    },
    // testnet: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       `https://data-seed-prebsc-1-s1.binance.org:8545`
    //     ),
    //   network_id: 97,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    //   gas: "1000000",
    //   gasPrice: "470000000000",
    // },
    // bsc: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       `https://bsc-dataseed1.binance.org`
    //     ),
    //   network_id: 56,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
    // ropsten: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       process.env.MNEMONIC,
    //       `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`
    //     ),
    //   network_id: "3",
    //   gas: "1000000",
    //   gasPrice: "470000000000",
    //   confirmations: 2, // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    // },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },
  mocha: {
    // timeout: 100000
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.6", // Fetch exact version from solc-bin (default: truffle's version)
      docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200,
        },
        // evmVersion: "byzantium",
        evmVersion: "istanbul",
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false,
  },
};
