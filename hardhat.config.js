require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.2",
  paths: {
    artifacts: './src/artifacts'  
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/aKLCdCQR0UH5AX6qfEGm99AA3qSr_PFg",
      accounts: [`93dea7618933a528a8edaf90773b3454635cf7eb6dc2b6d11dc70f793210fb10`]
    }
  }
};
