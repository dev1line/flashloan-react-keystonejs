const FlashloanMoneyLego = artifacts.require("FlashloanMoneyLego.sol");
const HandleToken = artifacts.require("HandleToken.sol");
const Checker = artifacts.require("Checker.sol");
module.exports = function (_deployer) {
  _deployer.deploy(Checker);
  _deployer.deploy(HandleToken);
  _deployer.deploy(FlashloanMoneyLego);
};
