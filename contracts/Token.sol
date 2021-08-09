// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WarEagleCoin is ERC20 {
    constructor() ERC20("WarEagleCoin", "WDE") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}
