const FlashloanMoneyLego = artifacts.require("FlashloanMoneyLego.sol");
const HandleToken = artifacts.require("HandleToken.sol");
module.exports = function (_deployer) {
  _deployer.deploy(FlashloanMoneyLego);
  _deployer.deploy(HandleToken);
};
