const Counter = artifacts.require("./Counter.sol");
const Greeter = artifacts.require("./Greeter.sol");
const MyToken = artifacts.require("./MyToken.sol");
const MyDapp = artifacts.require("./MyDapp.sol");

module.exports = function (deployer) {
  deployer.deploy(Counter);
  deployer.deploy(Greeter, "Hello World!");
  deployer.deploy(MyToken, 999999);
  deployer.deploy(MyDapp);
};
