// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract PayCrypt{
    event transactions(address indexed from, address to, uint amount, string symbol);
    event recipients(address indexed reecipientOf, address recipient, string recipientName);

    function _transfer(address payable _to, string memory symbol) public payable { 
        _to.transfer(msg.value);
        emit transactions(msg.sender, _to, msg.value, symbol); //emits transactions event on line 5. This is to store the information about the transaction. Events are stored in logs. 
    }

    //The _transfer function only allows the transaction of the native currencies of the chain. For e.g., if we are using Ethereum, we can send transactions in Ether and if we are using Polygon we can send transactions in Matic. We can't transfer ERC-20 tokens with this function, but we want to do that also. 
    //The saveTx function will emit the transactions of the ERC-20 tokens. The logic to tranfer the ERC-20 token is not written here. We will write it in React using Ether.js.

    function saveTx(address from, address to, uint amount, string memory symbol) public {
        emit transactions(from, to, amount, symbol); //emits transactions event on line 5
    }

    //This function is like saving a phone number in your phone. You add the name of the person and his wallet address. This is like a phonebook so you dont need to remember the address. 
    function addRecipient(address recipient, string memory name) public {
        emit recipients(msg.sender, recipient, name); //emits recipients event on line 6
    } 
}