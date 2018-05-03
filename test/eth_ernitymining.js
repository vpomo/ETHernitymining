var ETHernitymining = artifacts.require("./ETHernitymining.sol");
//import assertRevert from './helpers/assertRevert';

contract('ETHernitymining', (accounts) => {
    var contract;
    //var owner = "0x111231f299fB72bFD89766EaDA740a0a00709858";
    var owner = accounts[0];
    var maxTotalSupply = 150 * 10**6 * 10**18;
    var OneToken = 10**18;

    it('should deployed contract', async ()  => {
        assert.equal(undefined, contract);
        contract = await ETHernitymining.deployed();
        assert.notEqual(undefined, contract);
    });

    it('get address contract', async ()  => {
        assert.notEqual(undefined, contract.address);
    });

    it('verification balance contract', async ()  => {
        var totalSupplyTest = await contract.totalSupply.call();
        //console.log(JSON.stringify(totalSupplyTest));
        assert.equal(Number(totalSupplyTest), Number(maxTotalSupply));

        var balanceOwner = await contract.balanceOf(owner);
        assert.equal(Number(totalSupplyTest), balanceOwner);
    });

    it('verification of transfer Token', async ()  => {
        var balanceAccountTwoBefore = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerBefore = await contract.balanceOf(accounts[0]);

        await contract.transfer(accounts[2], OneToken, {from:accounts[0]});
        var balanceAccountTwoAfter = await contract.balanceOf(accounts[2]);
        var balanceAccountOwnerAfter = await contract.balanceOf(accounts[0]);

        assert.isTrue(balanceAccountTwoBefore < balanceAccountTwoAfter);
        assert.isTrue(Number(balanceAccountOwnerBefore) > Number(balanceAccountOwnerAfter));
        assert.equal(0, balanceAccountTwoBefore);
        assert.equal(OneToken, balanceAccountTwoAfter);
    });

    it('verification claim tokens', async() => {
        var balanceAccountOneBefore = await contract.balanceOf(accounts[1]);
        assert.equal(0, balanceAccountOneBefore);
        await contract.transfer(accounts[1], OneToken, {from: accounts[0]});
        var balanceAccountOneAfter = await contract.balanceOf(accounts[1]);
        await contract.transfer(contract.address, balanceAccountOneAfter, {from: accounts[1]});
        var balanceContractBefore = await contract.balanceOf(contract.address);
        assert.equal(OneToken, balanceContractBefore);
        //console.log("balanceContractBefore = " + balanceContractBefore);

        await contract.claimTokens(contract.address, {from: accounts[0]});
        var balanceContractAfter = await contract.balanceOf(contract.address);
        assert.equal(0, balanceContractAfter);
    });
});



