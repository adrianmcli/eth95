pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";


contract Counter {
    uint256 count = 0;

    function increment() public {
        count++;
        console.log("Incremented to '%s'", count);
    }

    function incrementBy(uint256 x) public {
        count = count + x;
        console.log("Incremented by '%s' to '%s'", x, count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
