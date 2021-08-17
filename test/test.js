const { assert } = require("chai");

describe("Token", function () {
  const initialSupply = 1000 * 10 * 18;
  let token;
  let addr1, addr2;
  beforeEach(async () => {
    const accounts = await ethers.provider.listAccounts();
    addr1 = accounts[0];
    addr2 = accounts[1];
    const warEagleToken = await ethers.getContractFactory("Token");
    token = await warEagleToken.deploy(initialSupply);
    await token.deployed();
  });

  it("should mint to the deployer 1000 WarEagle tokens", async function () {
    const balance = await token.balanceOf(addr1);

    assert.equal(balance.toString(), initialSupply.toString());
  });

  describe('we transfer some tokens to signer 1', () => {
    const sendAmount = 10 * 10 * 18;
    beforeEach(async () => {
      await token.transfer(addr2, sendAmount);
    });

    it("should have 990 tokens in the initial deployer acct", async function () {
      const balance = await token.balanceOf(addr1);

      const expectedBalance = 990 * 10 * 18;

      assert.equal(balance.toString(), expectedBalance.toString());
    });

    it("should have 10 tokens in the addr2", async function () {
      const balance = await token.balanceOf(addr2);

      assert.equal(balance.toString(), sendAmount.toString());
    });
  });

  describe('we approve someone else to spend our tokens', () => {
    const approvalAmount = 50 * 10 * 18 ;
    beforeEach(async () => {
      await token.approve(addr2, approvalAmount);
    });

    it("should not change the addr1 balance", async () => {
      const balance = await token.balanceOf(addr1);

      assert.equal(balance.toString(), initialSupply.toString());
    });

    it("should change the addr1 allowance of addr2", async () => {
      const allowance = await token.allowance(addr1, addr2);

      assert.equal(allowance.toString(), approvalAmount.toString());
    });

    describe("addr2 tries to spend the tokens", () => {
      beforeEach(async () => {
        const signer = await ethers.provider.getSigner(1);
        await token.connect(signer).transferFrom(addr1, addr2, approvalAmount);
      });

      it("should update the balance of the addr1", async () => {
        const balance = await token.balanceOf(addr1);

        const expectedBalance = 950 * 10 * 18;

        assert.equal(balance.toString(), expectedBalance.toString());
      });

      it("should update the balance of the addr2", async () => {
        const balance = await token.balanceOf(addr2);

        const expectedBalance = 50 * 10 * 18;

        assert.equal(balance.toString(), expectedBalance.toString());
      });
    });
  });
});
