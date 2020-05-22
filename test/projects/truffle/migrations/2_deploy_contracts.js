const Counter = artifacts.require("./Counter.sol");
const Greeter = artifacts.require("./Greeter.sol");
const MyToken = artifacts.require("./MyToken.sol");

module.exports = function (deployer) {
  deployer.deploy(Counter);
  deployer.deploy(Greeter, "Hello World!");
  deployer.deploy(MyToken, 999999);
};
