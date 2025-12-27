// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DJCoin {

    mapping(address=>uint) public balanceOf;

    address public owner;

    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    uint8 private _decimals;

    mapping(address=>mapping(address=>uint256)) private allowed;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(){
        owner=msg.sender;
        _name="DJCoin";
        _symbol="DC";
        _decimals=18;

        
        _totalSupply=1000 * 10 ** _decimals;
        balanceOf[owner]=_totalSupply;
        emit Transfer(address(0), owner, _totalSupply);
    }

    modifier onlyOwner(){
        require(msg.sender==owner,"You are not the owner");
        _;
    }

    function mintCoins(uint _amount) public onlyOwner {
        require(_amount > 0);
        balanceOf[owner]+=_amount;
        _totalSupply+=_amount;

        emit Transfer(address(0),owner,_amount);
    }

    //ERC 20 Standard Optional Functions
    function name() public view returns (string memory){
        return _name;
    }

    function symbol() public view returns (string memory){
        return _symbol;
    }

    function decimals() public view returns (uint8){
        return _decimals;
    }

    //ERC 20 Standard Mandatory Functions

    function totalSupply() public view returns(uint256){
        return _totalSupply;
    }

    function transfer(address _to,uint256 _value) public returns(bool success){
    require(_to!=address(0),"Invalid Reciever");
    require(balanceOf[msg.sender]>=_value,"You dont have enough balance");
    balanceOf[msg.sender]-=_value;
    balanceOf[_to]+=_value;
    emit Transfer(msg.sender,_to,_value);
    return true;
    }

    function transferFrom(address _from,address _to,uint256 _value) public returns (bool success){
        require(_from!=address(0),"Invalid Sender");
        require(_to!=address(0),"Invalid Reciever");
        require(balanceOf[_from]>=_value,"Insufficient Balance");
        require(allowed[_from][msg.sender]>=_value,"You are asking more than what is allotted");

        balanceOf[_from]-=_value;
        balanceOf[_to]+=_value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function approve(address _spender,uint256 _value) public returns (bool success){
        // require(balance[msg.sender]>=_value,"You cannot allot more than what you have");
        //ERC-20 does NOT tie approvals to current balance.
        // Why? Users approve future spending,Balance can change later,DEX flows break with this check
        require(_spender!=address(0),"Invalid Spender");
        allowed[msg.sender][_spender]=_value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner,address _spender) public view returns (uint256 remaining){
        return allowed[_owner][_spender];
    }
}