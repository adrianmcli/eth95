pragma solidity >=0.6.0 <0.7.0;


contract Counter {
    uint256 count = 0;

    function increment() public {
        count++;
    }

    function incrementBy(uint256 x) public {
        count = count + x;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
