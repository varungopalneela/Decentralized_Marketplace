// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Login {
    struct User {
        uint256 userSno;
        address userId;
        string passwordHash; // Store a hashed password for security
        string name;
    }

    mapping(address => User) private users;
    mapping(address => bool) private registeredUsers; // To check if the user is registered
    uint256 private userCount; // To assign unique userSno

    event UserRegistered(address indexed userId, uint256 userSno, string name);
    event LoginSuccessful(address indexed userId);
    
    // Modifier to check if a user is already registered
    modifier onlyNewUser() {
        require(!registeredUsers[msg.sender], "User already registered.");
        _;
    }

    // Function to register a new user
    function register(string memory _passwordHash, string memory _name) public onlyNewUser {
        userCount++;
        users[msg.sender] = User(userCount, msg.sender, _passwordHash, _name);
        registeredUsers[msg.sender] = true;

        emit UserRegistered(msg.sender, userCount, _name);
    }

    // Function to verify login
    function login(string memory _passwordHash) public view returns (bool) {
        require(registeredUsers[msg.sender], "User not registered.");
        require(keccak256(abi.encodePacked(users[msg.sender].passwordHash)) == keccak256(abi.encodePacked(_passwordHash)), "Incorrect password.");

        return true;
    }

    // Function to get user details (only for registered users)
    function getUserDetails() public view returns (uint256, address, string memory) {
        require(registeredUsers[msg.sender], "User not registered.");
        User memory user = users[msg.sender];
        return (user.userSno, user.userId, user.name);
    }
}
