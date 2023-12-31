require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-gas-reporter")
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("./tasks/accounts")
require("solidity-coverage")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "YOUR_LOCALHOST_RPC_URL/",
            chainId: 31337,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true, // Color may messed up the file
        coinmarketcap: COINMARKETCAP_API_KEY, // to get the USD price
        //token: "MATIC", // Example for if u want deploy in polygon
    },
}
