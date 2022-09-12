// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;


contract MyDapp {
    struct Message {
        uint256 num;
        bool state;
        address add;
        string link;
    }

    function getStruct() public pure returns (Message memory, uint) {
        Message memory _msg = Message(
            1,
            true,
            0x6B175474E89094C44Da98b954EedeAC495271d0F,
            "hello"
        );
        return (_msg, 2);
    }
}
