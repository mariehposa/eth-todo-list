const Todo = (props) => {
	const {
		tasks,
		filter,
		isLoading,
		handleTaskCheckboxChange,
		handleEditTask,
		handleDeleteTask,
	} = props;

	// Filter tasks based on the selected filter
	const filteredTasks = tasks.filter((task) => {
		if (filter === "all") {
			return true;
		} else if (filter === "completed") {
			return task.completed;
		} else if (filter === "uncompleted") {
			return !task.completed;
		}
		return true;
	});

	// Display loading message while data is being fetched
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<ul id="list">
			{filteredTasks.map((task) => (
				<li key={task.id}>
					<input
						type="checkbox"
						id={`task-${task.id}`}
						data-id={task.id}
						className="custom-checkbox"
						checked={task.completed}
						onChange={() => handleTaskCheckboxChange(task.id)}
					/>
					<label htmlFor={`task-${task.id}`}>{task.title}</label>
					<div>
						<img
							src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
							className="edit"
							data-id={task.id}
							onClick={() => handleEditTask(task.id)}
							alt="edit-button"
						/>
						<img
							src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
							className="delete"
							data-id={task.id}
							onClick={() => handleDeleteTask(task.id)}
							alt="delete-button"
						/>
					</div>
				</li>
			))}
		</ul>
	);
};

export default Todo;
