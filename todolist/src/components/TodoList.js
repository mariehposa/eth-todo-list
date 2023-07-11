import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Todo from "./Todo";
import taskLogo from "../assets/tasks.png"
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const TodoList = () => {
	// State variables
	const [tasks, setTasks] = useState([]); // Holds the list of tasks
	const [inputValue, setInputValue] = useState(""); // Holds the value of the input field
	const [filter, setFilter] = useState("all"); // Holds the current filter type
	const [isLoading, setIsLoading] = useState(true); // Indicates whether the data is being loaded
	const [editTaskId, setEditTaskId] = useState(null); // Holds the ID of the task being edited

	// const [data, setData] = useState('');
	// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
	// const contractAddress = '0x123456789...'; // Replace with your contract address
	// const contractABI = [...]; // Replace with your contract's ABI

	// const contract = new ethers.Contract(contractAddress, contractABI, provider);
	// async function getDataFromContract() {
	//   const data = await contract.getData();
	//   console.log(data);
	//   setData(data);
	// }

	// Fetch initial data
	useEffect(() => {
		fetchTodos();
	}, []);

	// Fetch todos from an API
	const fetchTodos = async () => {
		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos?_limit=4"
			);
			const todos = await response.json();
			setTasks(todos);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	// Handle input change
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// Add a new task
	const handleAddTask = async () => {
		if (inputValue.trim() === "") {
			return;
		}

		const newTask = {
			title: inputValue,
			completed: false,
		};

		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/todos",
				{
					method: "POST",
					body: JSON.stringify(newTask),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const addedTask = await response.json();
			setTasks((prevTasks) => [...prevTasks, addedTask]);
			setInputValue("");
			toast.success("Task added successfully");
		} catch (error) {
			toast.error("Error adding task");
		}
	};

	// Handle checkbox change for a task
	const handleTaskCheckboxChange = (taskId) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task
			)
		);
	};

	// Delete a task
	const handleDeleteTask = (taskId) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
		toast.success("Task deleted successfully");
	};

	// Edit a task
	const handleEditTask = (taskId) => {
		setEditTaskId(taskId);
		const taskToEdit = tasks.find((task) => task.id === taskId);
		setInputValue(taskToEdit.title);
	};

	// Update a task
	const handleUpdateTask = async () => {
		if (inputValue.trim() === "") {
			return;
		}

		const updatedTask = {
			title: inputValue,
			completed: false,
		};

		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos/${editTaskId}`,
				{
					method: "PUT",
					body: JSON.stringify(updatedTask),
					headers: {
						"Content-type": "application/json; charset=UTF-8",
					},
				}
			);
			const updatedTaskData = await response.json();
			setTasks((prevTasks) =>
				prevTasks.map((task) =>
					task.id === editTaskId
						? { ...task, title: updatedTaskData.title }
						: task
				)
			);
			setInputValue("");
			setEditTaskId(null);
			toast.success("Task updated successfully");
		} catch (error) {
			toast.error("Error updating task");
		}
	};

	// Mark all tasks as completed
	const handleCompleteAll = () => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => ({ ...task, completed: true }))
		);
	};

	// Clear completed tasks
	const handleClearCompleted = () => {
		setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
	};

	// Handle filter change
	const handleFilterChange = (filterType) => {
		setFilter(filterType);
	};

	// Render the todo list
	return (
		<div className="contaner">
			<ToastContainer />
			<div className="todo-app">
				<p class="title is-1 has-text-centered head"> <img src={taskLogo} alt="task-logo" /> Task Tracker</p>
				<div className="row">
					<i className="fas fa-list-check"></i>
					<input
						type="text"
						className="add-task"
						id="add"
						placeholder="Add your todo"
						autoFocus
						value={inputValue}
						onChange={handleInputChange}
					/>
					<button
						id="btn"
						class="button is-link add-btn"
						onClick={editTaskId ? handleUpdateTask : handleAddTask}
					>
						{editTaskId ? "Update" : "Add"}
					</button>
				</div>

				<div className="mid">
					<button
						id="complete-all"
						onClick={handleCompleteAll}
						class="button is-primary is-inverted"
					>
						Complete all tasks
					</button>
					<button
						id="clear-all"
						onClick={handleClearCompleted}
						class="button is-danger is-inverted"
					>
						Delete comp tasks
					</button>
				</div>

				<Todo
					tasks={tasks}
					filter={filter}
					isLoading={isLoading}
					handleTaskCheckboxChange={handleTaskCheckboxChange}
					handleEditTask={handleEditTask}
					handleDeleteTask={handleDeleteTask}
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
								Total Tasks: <span id="tasks-counter">{tasks.length}</span>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoList;
