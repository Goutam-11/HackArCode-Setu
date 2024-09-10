const lockedAmount = 0;
async function main() {
    const StakingAndPayment = await ethers.getContractFactory("StakingAndPayment");
    const stakingAndPayment = await StakingAndPayment.deploy();
    await stakingAndPayment.deploymentTransaction().wait();
    console.log("StakingAndPayment deployed to:", JSON.stringify(stakingAndPayment.target));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  