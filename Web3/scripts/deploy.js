const main = async () => {
  const secSafeFactory = await hre.ethers.getContractFactory("SecSafe");
  const secSafeContract = await secSafeFactory.deploy();

  await secSafeContract.waitForDeployment();
  const myAddress = await secSafeContract.getAddress();
  console.log("Transactions address: ", myAddress);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
