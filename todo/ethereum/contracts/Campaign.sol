pragma solidity ^0.4.17;

contract TodoListFactory {
    address[] public deployedTodoLists;

    function createTodoList() public {
        address newTodoList = new TodoList(msg.sender);
        deployedTodoLists.push(newTodoList);
    }

    function getDeployedTodoLists() public view returns (address[]) {
        return deployedTodoLists;
    }
}


contract TodoList {

    address public owner;
    string[] public todos;
    mapping (uint => bool) public todoMapping;

    modifier restricted() {
        require(msg.sender == owner);
        _;
    }

    function TodoList(address creator) public {
        owner = creator;
    }

    function createTodo(string title) public restricted{
        todos.push(title);
        todoMapping[todos.length - 1] = false;
    }

    function getTodo(uint index) public view returns (string) {
        return todos[index];
    }

    function getTodoWithStatus(uint index) public view returns (string, bool) {
        return (todos[index], todoMapping[index]);
    }

    


    function getTodoCount() public view returns (uint) {
        return todos.length;
    }

    function completeTodo(uint index) public restricted {
        todoMapping[index] = true;
    }
   
}
