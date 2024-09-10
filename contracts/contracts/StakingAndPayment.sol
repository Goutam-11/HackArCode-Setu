// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StakingAndPayment {
    struct Stake {
        address student;
        address counselor;
        uint256 stakeAmount;
        bool isSessionComplete;
    }

    mapping(uint256 => Stake) public stakes;
    uint256 public stakeCounter;

    event StakeInitiated(uint256 stakeId, address indexed student, address indexed counselor, uint256 stakeAmount);
    event SessionCompleted(uint256 stakeId);
    event PaymentReleased(uint256 stakeId, address indexed recipient, uint256 amount);

    function initiateStake(address _counselor) external payable returns (uint256 stakeId) {
        require(msg.value > 0, "Stake amount should be greater than zero");
        
        stakeId = ++stakeCounter;
        stakes[stakeId] = Stake({
            student: msg.sender,
            counselor: _counselor,
            stakeAmount: msg.value,
            isSessionComplete: false
        });

        emit StakeInitiated(stakeId, msg.sender, _counselor, msg.value);
    }

    function completeSession(uint256 _stakeId) external {
        Stake storage stake = stakes[_stakeId]; // Cache struct in memory
        require(stake.counselor == msg.sender, "Only counselor can mark session complete");
        require(!stake.isSessionComplete, "Session already completed");

        stake.isSessionComplete = true;

        emit SessionCompleted(_stakeId);
    }

    function releasePayment(uint256 _stakeId) external {
        Stake storage stake = stakes[_stakeId]; // Cache struct in memory
        require(stake.isSessionComplete, "Session not completed yet");
        require(stake.student == msg.sender, "Only student can release payment");
        
        uint256 stakeAmount = stake.stakeAmount;
        require(stakeAmount > 0, "No stake available to release");
        
        stake.stakeAmount = 0; // Clear the stake amount to prevent re-entrancy
        payable(stake.counselor).transfer(stakeAmount);

        emit PaymentReleased(_stakeId, stake.counselor, stakeAmount);
    }

    function getStake(uint256 _stakeId) external view returns (Stake memory) {
        return stakes[_stakeId];
    }
}
