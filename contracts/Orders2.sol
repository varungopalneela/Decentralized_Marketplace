// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Orders2 {
    // Struct to represent an Item
    struct Order {
        uint256 order_id;
        uint256 order_cost;
        uint256[] items;  // Array to store items, where each item is represented as 100 * item_id + item_quantity
    }

    // Mapping to store orders for each user (address => Order[])
    mapping(address => Order[]) public userOrders;
    mapping(address => uint256) public orderCount;

    address payable public recipient = 0xA549654Aff0A201bE3061118497594e17316A1Fc; // Replace with actual recipient


    // Event to log the creation of an order
    event OrderCreated(address indexed user, uint256 order_id);

    // Function to create an order for the caller
    function createOrder(
        uint256[] memory _item_ids,
        uint256[] memory _item_quantities,
        uint256[] memory _item_cost
        ) public payable {
        // Ensure that the arrays for item_ids and item_quantities have the same length
        require(
            _item_ids.length == _item_quantities.length,
            "Item arrays must have the same length"
        );

        orderCount[msg.sender]+=1;

        // Create a new empty order
        userOrders[msg.sender].push(Order({
            order_id: orderCount[msg.sender],
            order_cost: 0,
            items: new uint256[](0)  // Initialize an empty array for items
        }));

        // Get a reference to the newly created order
        Order storage newOrder = userOrders[msg.sender][userOrders[msg.sender].length - 1];

        uint256 totalCost = 0;

        // Add items to the order (each item stored as 100 * item_id + item_quantity)
        for (uint256 i = 0; i < _item_ids.length; i++) {
            uint256 itemValue = 100 * _item_ids[i] + _item_quantities[i];
            totalCost += (_item_cost[i] * _item_quantities[i]);
            newOrder.items.push(itemValue);
        }
        newOrder.order_cost = totalCost;
        totalCost = (totalCost * 1 ether) / 230508; // Convert ETH to Wei

        // Ensure the sender has sent enough Ether to cover the order cost
        require(msg.value >= totalCost, "Insufficient funds sent");

        // ✅ Transfer ETH to recipient
        (bool sent, ) = recipient.call.value(totalCost)("");
        require(sent, "Transfer to recipient failed");


        // Emit an event that the order was created successfully
        emit OrderCreated(msg.sender, orderCount[msg.sender]);
    }


    // Function to display a user's order by order_id
    function displayOrder(uint256 _order_id) public view returns (uint256 order_id,uint256 order_cost, uint256[] memory items,uint256 total_order_count) {
        // Find the order by order_id
        address _user = msg.sender;

        for (uint256 i = 0; i < userOrders[_user].length; i++) {
            if (userOrders[_user][i].order_id == _order_id) {
                // Return the order cost and items if the order is found
                return (userOrders[_user][i].order_id,userOrders[_user][i].order_cost, userOrders[_user][i].items,orderCount[_user]);
            }
        }

        // If no order is found with the given order_id, return zeroes
        revert("Order not found.");
    }
}
