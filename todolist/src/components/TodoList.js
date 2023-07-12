import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ToastContainer } from "react-toastify";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "../config";
import Todo from "./Todo.js";
import taskLogo from "../assets/tasks.png";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const TodoList = () => {
	const [account, setAccount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [todoList, setTodoList] = useState(null);

	const [tasks, setTasks] = useState([]);
	const [newTaskContent, setNewTaskContent] = useState("");
	const [editTaskId, setEditTaskId] = useState(0);
	const [taskCount, setTaskCount] = useState(0);

	const [filter, setFilter] = useState("all"); // Holds the current filter type

	useEffect(() => {
		loadBlockchainData();
	}, []);

	async function loadBlockchainData() {
		const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
		const accounts = await web3.eth.getAccounts();
		setAccount(accounts[0]);

		const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
		setTodoList(todoList);

		const taskCount = await todoList.methods.taskCount().call();
		setTaskCount(taskCount);

		var arr = [];
		for (var i = 1; i <= taskCount; i++) {
			const task = await todoList.methods.tasks(i).call();
			arr.push(task);
		}

		arr = arr.filter((it) => it.content);

		setTaskCount(arr.length);
		setTasks(arr);
		setLoading(false);
	}

	const addTask = (content) => {
		setLoading(true);

		todoList.methods
			.addTask(content)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				setNewTaskContent("");
				loadBlockchainData();
			});
	};

	const toggleCompleted = (taskId) => {
		setLoading(true);

		todoList.methods
			.toggleCompleted(taskId)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				loadBlockchainData();
			});
	};

	const editTask = () => {
		setLoading(true);

		todoList.methods
			.editTask(editTaskId, newTaskContent)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				setNewTaskContent("");
				setEditTaskId(0);
				loadBlockchainData();
			});
	};

	const deleteTask = (taskId) => {
		setLoading(true);

		todoList.methods
			.deleteTask(taskId)
			.send({ from: account })
			.once("receipt", (receipt) => {
				setLoading(false);
				loadBlockchainData();
			});
	};

	// Handle filter change
	const handleFilterChange = (filterType) => {
		setFilter(filterType);
	};

	return (
		<div className="contaner">
			<ToastContainer />
			<div className="todo-app">
				<p class="title is-1 has-text-centered head">
					{" "}
					<img src={taskLogo} alt="task-logo" /> Task Tracker
				</p>
				<div className="row">
					<i className="fas fa-list-check"></i>
					<input
						type="text"
						className="add-task"
						id="add"
						placeholder="Add your todo"
						autoFocus
						value={newTaskContent}
						onChange={(e) => setNewTaskContent(e.target.value)}
					/>
					<button
						id="btn"
						class="button is-link add-btn"
						onClick={(e) => {
							e.preventDefault();
							editTaskId !== 0 ? editTask() : addTask(newTaskContent);
						}}
					>
						{editTaskId !== 0 ? "Update" : "Add Task"}
					</button>
				</div>

				<div className="mid">
					<button id="complete-all" class="button is-primary is-inverted">
						Tasks
					</button>
					<button id="clear-all" class="button is-danger is-inverted">
						Actions
					</button>
				</div>

				<Todo
					tasks={tasks}
					filter={filter}
					loading={loading}
					toggleCompleted={toggleCompleted}
					setEditTaskId={setEditTaskId}
					setNewTaskContent={setNewTaskContent}
					deleteTask={deleteTask}
				/>

				<div className="filters">
					<div className="dropdown">
						<button className="dropbtn button is-success is-medium">
							Filter
						</button>
						<div className="dropdown-content">
							<p id="all" onClick={() => handleFilterChange("all")}>
								All
							</p>
							<p id="rem" onClick={() => handleFilterChange("uncompleted")}>
								Uncompleted
							</p>
							<p id="com" onClick={() => handleFilterChange("completed")}>
								Completed
							</p>
						</div>
					</div>

					<div className="completed-task">
						<p>
							Completed:{" "}
							<span id="c-count">
								{tasks.filter((task) => task.completed).length}
							</span>
						</p>
					</div>
					<div className="remaining-task">
						<p>
							<span id="total-tasks">
								Total Tasks: <span id="tasks-counter">{taskCount}</span>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
