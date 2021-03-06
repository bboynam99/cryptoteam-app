pragma solidity ^0.4.24;

contract Payment {

    address owner = msg.sender;
    bool paused = false;

    event Buy(address indexed _seller, address indexed _buyer, uint256 _price, string _offerID);
    event Transfer(address indexed _from, address indexed _to, uint256 _amount);

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier notPaused() {
        require(!paused);
        _;
    }
    
    //expected amount should be in wei
    function buyFromContract(uint256 _expectedAmount, string _offerID) public payable notPaused {

            require(_expectedAmount == msg.value && msg.value != 0);
            owner.transfer(msg.value);

            // Broadcast events
            emit Buy(address(this), msg.sender, msg.value, _offerID);
            emit Transfer(address(this), msg.sender, msg.value);
    }

    function buyFromUser(uint256 _expectedAmount, address seller, string _offerID) public payable notPaused {

        require(_expectedAmount == msg.value && msg.value != 0);
        
        uint256 fee = (50 * msg.value)/10000;
        uint256 sellerFunds = msg.value - fee;

        seller.transfer(sellerFunds);
        owner.transfer(fee);

        // Broadcast events
        emit Transfer(msg.sender, seller, sellerFunds);
        emit Transfer(msg.sender, address(this), fee);
        emit Buy(seller, msg.sender, msg.value, _offerID);
    
    }

    function pause(bool _pauseState) public onlyOwner {
        paused = _pauseState;
    }

    function() public payable {
        owner.transfer(msg.value);
    }

}