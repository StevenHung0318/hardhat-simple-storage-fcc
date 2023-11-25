const { task } = require("hardhat/config")


task("accounts", "Print the list of accounts", async (taskArgs, hre) => {
    const signers = await hre.ethers.getSigners()

    for (const signer of signers) {
        console.log(signer.address)
    }
})

module.exports = {}