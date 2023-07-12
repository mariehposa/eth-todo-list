pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskAdded(
    uint id,
    string content,
    bool completed
  );

  event TaskCompleted(
    uint id,
    bool completed
  );

   event TaskEdited(
    uint id,
    string content
  );

  event TaskDeleted(
    uint id
  );

  constructor() public {
    addTask("Visit Mdx");
  }

  function addTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskAdded(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];
    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskCompleted(_id, _task.completed);
  }

  function editTask(uint _id, string memory _content) public {
    Task memory _task = tasks[_id];
    _task.content = _content;
    tasks[_id] = _task;
    emit TaskEdited(_id, _content);
  }

  function deleteTask(uint _id) public {
    delete tasks[_id];
    taskCount--;
    emit TaskDeleted(_id);
  }
}