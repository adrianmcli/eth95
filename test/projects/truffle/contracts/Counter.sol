pragma solidity ^0.8.0;


contract Counter {
    uint256 count = 0;
    event UpdatedCount(uint256 count);

    function increment() public {
        count++;
        emit UpdatedCount(count);
    }

    function incrementBy(uint256 x) public {
        count = count + x;
        emit UpdatedCount(count);
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}
