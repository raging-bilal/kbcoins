const KBCoins = artifacts.require("../contracts/KBCoins.sol");

contract("KBCoins", function (accounts) {
  let kbcoinsInstance;

  it("activating contract with all the values", async () => {
    kbcoinsInstance = await KBCoins.deployed();
    // console.log(funTokenInstance);
    const name = await kbcoinsInstance.name();
    const symbol = await kbcoinsInstance.symbol();
    const standard = await kbcoinsInstance.standard();
    const totalSupply = await kbcoinsInstance.totalSupply();
    const ownerOfContract = await kbcoinsInstance.ownerOfContract();
    // console.log(ownerOfContract);
    return name, symbol, standard, totalSupply, ownerOfContract;
  });

  it("initalizing the supply of token & contract owner", async () => {
    kbcoinsInstance = await KBCoins.deployed();
    const totalSupply = await kbcoinsInstance.totalSupply();
    await assert.equal(
      totalSupply.toNumber(),
      1000000,
      "sets the total supply to 1000000"
    );

    const adminBalance = await kbcoinsInstance.balanceOf(accounts[0]);
    await assert.equal(
      adminBalance.toNumber(),
      1000000,
      "Transfering all token to account[0] admin"
    );

    // console.log(adminBalance.toNumber());
    // console.log(accounts[0]);

    return totalSupply, adminBalance;
  });

  it("transfers token ownership", function () {
    return KBCoins.deployed()
      .then(function (instance) {
        tokenInstance = instance;

        return tokenInstance.transfer.call(accounts[1], 9999999999);
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "error message must contain revert"
        );
        return tokenInstance.transfer.call(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then(function (success) {
        assert.equal(success, true, "it returns true");
        return tokenInstance.transfer(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then(function (receipt) {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          "logs the account the tokens are transferred from"
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          "logs the account the tokens are transferred to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          250000,
          "logs the transfer amount"
        );
        return tokenInstance.balanceOf(accounts[1]);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          250000,
          "adds the amount to the receiving account"
        );
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          750000,
          "deducts the amount from the sending account"
        );
      });
  });

  it("approves tokens for delegated transfer", function () {
    return KBCoins.deployed()
      .then(function (instance) {
        kbcoinsInstance = instance;
        return kbcoinsInstance.approve.call(accounts[1], 100);
      })
      .then(function (success) {
        assert.equal(success, true, "it returns true");
        return kbcoinsInstance.approve(accounts[1], 100, {
          from: accounts[0],
        });
      })
      .then(function (receipt) {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Approval",
          'should be the "Approval" event'
        );
        assert.equal(
          receipt.logs[0].args._owner,
          accounts[0],
          "logs the account the tokens are authorized by"
        );
        assert.equal(
          receipt.logs[0].args._spender,
          accounts[1],
          "logs the account the tokens are authorized to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          100,
          "logs the transfer amount"
        );
        return kbcoinsInstance.allowance(accounts[0], accounts[1]);
      })
      .then(function (allowance) {
        assert.equal(
          allowance.toNumber(),
          100,
          "stores the allowance for delegated trasnfer"
        );
      });
  });

  it("handles delegated token transfers", function () {
    return KBCoins.deployed()
      .then(function (instance) {
        kbcoinsInstance = instance;
        fromAccount = accounts[2];
        toAccount = accounts[3];
        spendingAccount = accounts[4];
        // Transfer some tokens to fromAccount
        return kbcoinsInstance.transfer(fromAccount, 100, {
          from: accounts[0],
        });
      })
      .then(function (receipt) {
        // Approve spendingAccount to spend 10 tokens form fromAccount
        return kbcoinsInstance.approve(spendingAccount, 10, {
          from: fromAccount,
        });
      })
      .then(function (receipt) {
        // Try transferring something larger than the sender's balance
        return kbcoinsInstance.transferFrom(fromAccount, toAccount, 9999, {
          from: spendingAccount,
        });
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "cannot transfer value larger than balance"
        );
        // Try transferring something larger than the approved amount
        return kbcoinsInstance.transferFrom(fromAccount, toAccount, 20, {
          from: spendingAccount,
        });
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "cannot transfer value larger than approved amount"
        );
        return kbcoinsInstance.transferFrom.call(fromAccount, toAccount, 10, {
          from: spendingAccount,
        });
      })
      .then(function (success) {
        assert.equal(success, true);
        return kbcoinsInstance.transferFrom(fromAccount, toAccount, 10, {
          from: spendingAccount,
        });
      })
      .then(function (receipt) {
        assert.equal(receipt.logs.length, 1, "triggers one event");
        assert.equal(
          receipt.logs[0].event,
          "Transfer",
          'should be the "Transfer" event'
        );
        assert.equal(
          receipt.logs[0].args._from,
          fromAccount,
          "logs the account the tokens are transferred from"
        );
        assert.equal(
          receipt.logs[0].args._to,
          toAccount,
          "logs the account the tokens are transferred to"
        );
        assert.equal(
          receipt.logs[0].args._value,
          10,
          "logs the transfer amount"
        );
        return kbcoinsInstance.balanceOf(fromAccount);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          90,
          "deducts the amount from the sending account"
        );
        return kbcoinsInstance.balanceOf(toAccount);
      })
      .then(function (balance) {
        assert.equal(
          balance.toNumber(),
          10,
          "adds the amount from the receiving account"
        );
        return kbcoinsInstance.allowance(fromAccount, spendingAccount);
      })
      .then(function (allowance) {
        assert.equal(
          allowance.toNumber(),
          0,
          "deducts the amount from the allowance"
        );
      });
  });
});
