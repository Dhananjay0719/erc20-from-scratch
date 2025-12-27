const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DJCoin ERC20 (from scratch)", function () {
  let DJCoin, djCoin;
  let owner, user1, user2;

  const INITIAL_SUPPLY = ethers.parseUnits("1000", 18);

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    DJCoin = await ethers.getContractFactory("DJCoin");
    djCoin = await DJCoin.deploy();
    await djCoin.waitForDeployment();
  });

//Deployment
  it("should assign initial supply to owner", async function () {
    const ownerBalance = await djCoin.balanceOf(owner.address);
    expect(ownerBalance).to.equal(INITIAL_SUPPLY);
  });

  it("should set correct token metadata", async function () {
    expect(await djCoin.name()).to.equal("DJCoin");
    expect(await djCoin.symbol()).to.equal("DC");
    expect(await djCoin.decimals()).to.equal(18);
  });

//Transfer
  it("should transfer tokens correctly", async function () {
    const amount = ethers.parseUnits("10", 18);

    await djCoin.transfer(user1.address, amount);

    expect(await djCoin.balanceOf(user1.address)).to.equal(amount);
    expect(await djCoin.balanceOf(owner.address)).to.equal(
      INITIAL_SUPPLY - amount
    );
  });

  it("should fail if sender has insufficient balance", async function () {
    const amount = ethers.parseUnits("1", 18);

    await expect(
      djCoin.connect(user1).transfer(user2.address, amount)
    ).to.be.revertedWith("You dont have enough balance");
  });

//Approval
  it("should approve allowance correctly", async function () {
    const amount = ethers.parseUnits("50", 18);

    await djCoin.approve(user1.address, amount);

    expect(
      await djCoin.allowance(owner.address, user1.address)
    ).to.equal(amount);
  });

//Transfer From
  it("should allow transferFrom within allowance", async function () {
    const amount = ethers.parseUnits("25", 18);

    await djCoin.approve(user1.address, amount);
    await djCoin.connect(user1).transferFrom(
      owner.address,
      user2.address,
      amount
    );

    expect(await djCoin.balanceOf(user2.address)).to.equal(amount);
    expect(
      await djCoin.allowance(owner.address, user1.address)
    ).to.equal(0);
  });

  it("should revert transferFrom if allowance exceeded", async function () {
    const amount = ethers.parseUnits("10", 18);

    await djCoin.approve(user1.address, amount);

    await expect(
      djCoin.connect(user1).transferFrom(
        owner.address,
        user2.address,
        amount + 1n
      )
    ).to.be.revertedWith("You are asking more than what is allotted");
  });

//Minting
  it("should allow owner to mint tokens", async function () {
    const mintAmount = ethers.parseUnits("100", 18);

    await djCoin.mintCoins(mintAmount);

    expect(await djCoin.totalSupply()).to.equal(
      INITIAL_SUPPLY + mintAmount
    );
  });

  it("should prevent non-owner from minting", async function () {
    const mintAmount = ethers.parseUnits("10", 18);

    await expect(
      djCoin.connect(user1).mintCoins(mintAmount)
    ).to.be.revertedWith("You are not the owner");
  });
});
