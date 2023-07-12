import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "../config";

function App() {
	const [web3, setWeb3] = useState(null);

	const [account, setAccount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [todoList, setTodoList] = useState(null);

	const [tasks, setTasks] = useState([]);
	const [newTaskContent, setNewTaskContent] = useState("");

	const [editTaskId, setEditTaskId] = useState(0);
	const [taskCount, setTaskCount] = useState(0);

	useEffect(() => {
		loadBlockchainData();
		// initializeWeb3();
		// initializeContract();
		// getTaskCount();
		// fetchTasks();
	}, []);

	async function loadBlockchainData() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);
		const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
		setTodoList(todoList);
		console.log(todoList, "todoList");
		const taskCount = await todoList.methods.taskCount().call();
		setTaskCount(taskCount);
		const arr = [];
		for (var i = 1; i <= taskCount; i++) {
			const task = await todoList.methods.tasks(i).call();
			arr.push(task);
		}
		setTasks(arr);
		setLoading({ loading: false });
	}

	const addTask = (content) => {
		setLoading({ loading: true });
		todoList.methods
			.addTask(content)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading({ loading: false });
				setNewTaskContent("");
				loadBlockchainData();
			});
	};

	const toggleCompleted = (taskId) => {
		setLoading({ loading: true });

		todoList.methods
			.toggleCompleted(taskId)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading({ loading: false });
				loadBlockchainData();
			});
	};

  const editTask = () => {
    setLoading({ loading: true });

    todoList.methods
      .editTask(editTaskId, newTaskContent)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading({ loading: false });
        setNewTaskContent("");
        setEditTaskId(0);
        loadBlockchainData();
      });
  };

  const deleteTask = (taskId) => {
    setLoading({ loading: true });

    todoList.methods
      .deleteTask(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setLoading({ loading: false });
        loadBlockchainData();
      });
  };

	return (
		<div>
			<h1>Todo List</h1>
			<div>
				<input
					type="text"
					value={newTaskContent}
					onChange={(e) => setNewTaskContent(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						editTaskId !== 0 ? editTask() : addTask(newTaskContent);
					}}
				>
					{editTaskId !== 0 ? "Update" :"Add Task"}
				</button>
			</div>
			{/* <div>
        <input
          type="text"
          value={editTaskContent}
          onChange={(e) => setEditTaskContent(e.target.value)}
        />
        <button onClick={editTask}>Edit Task</button>
      </div> */}
			<div>
				{tasks.filter(t => t.content).map((task) => (
					<div key={task.id}>
						<input
							type="checkbox"
							name={task.id}
							defaultChecked={task.completed}
							// ref={(input) => {
							// 	this.checkbox = input;
							// }}
							onClick={(event) => {
								toggleCompleted(task.id);
							}}
						/>
						<span>{task.content}</span>
						<button onClick={() => {
                setEditTaskId(task.id);
                setNewTaskContent(task.content);
              }}>Edit</button>
						<button onClick={() => deleteTask(task.id)}>Delete</button>
					</div>
				))}
			</div>
			<p>Total Tasks: {taskCount}</p>
		</div>
	);
}

export default App;
