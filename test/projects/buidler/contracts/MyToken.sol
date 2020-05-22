pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("MyToken", "MYT") {
        _mint(msg.sender, initialSupply);
        console.log("Minted '%s' tokens", initialSupply);
    }
}
