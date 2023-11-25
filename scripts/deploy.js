// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const [deployer] = await ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    const simpleStorage = await SimpleStorageFactory.deploy()

    // 使用 Hardhat Network 提供的方法等待部署完成
    await simpleStorage.waitForDeployment()
    console.log("Deployed contract to: ", await simpleStorage.getAddress())

    // what happens when we deploy to our hardhat network?
    // Only want to verify on our testnet
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        // Sepolia ChainID=11155111 , &&->and , only verify when etherscanAPI exists
        console.log("Waiting for block confirmations...")
        await simpleStorage.deploymentTransaction().wait(6) // wait a few block to be mined
        await verify(await simpleStorage.getAddress(), [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
    console.log("Verifying contract...")
    // try -> avoid etherscan already aoto verify the contract and goes error
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        // e -> error
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
