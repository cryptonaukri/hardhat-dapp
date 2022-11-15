// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {

    address public owner;
    uint256 public count;

    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
        }

        // event eventName() -> emit eventName()
        event Logs(address indexed _owner, uint _count);

        //error errorName() -> revert errorName()
        error InsufficientCount(address _add, string _msg);
     modifier onlyOwner(){
         require(owner == msg.sender ,"Only owner can call this function");
         _;
     }   

    function setCount(uint256 _count) public {
        if(_count <= 5)
        revert InsufficientCount({ _add: msg.sender, _msg: "grater than 5"});
        count = count + _count;
        emit Logs(owner,count);
    }
}