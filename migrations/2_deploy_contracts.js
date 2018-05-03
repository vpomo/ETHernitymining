const ETHernitymining = artifacts.require('./ETHernitymining.sol');

module.exports = (deployer) => {
    //http://www.onlineconversion.com/unix_time.htm
    var owner = "0x111231f299fB72bFD89766EaDA740a0a00709858";
    deployer.deploy(ETHernitymining, owner);
};
