pragma solidity =0.6.6;

import "@openZeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract Checker {
    function name(address token) external view returns (string memory name) {
        name = ERC20PresetMinterPauser(token).name();
    }

    function symbol(address token)
        external
        view
        returns (string memory symbol)
    {
        symbol = ERC20PresetMinterPauser(token).symbol();
    }

    function totalSupply(address token) public view returns (uint256) {
        return ERC20PresetMinterPauser(token).totalSupply();
    }
}
