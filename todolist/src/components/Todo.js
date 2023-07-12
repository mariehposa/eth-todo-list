const Todo = (props) => {
	const {
		tasks,
		filter,
		loading,
		toggleCompleted,
		setEditTaskId,
		setNewTaskContent,
		deleteTask,
	} = props;

	// Filter tasks based on the selected filter
	// const filteredTasks = tasks
	// 	.filter((t) => t.content)
	// 	.filter((task) => {
	// 		if (filter === "all") {
	// 			return true;
	// 		} else if (filter === "completed") {
	// 			return task.completed;
	// 		} else if (filter === "uncompleted") {
	// 			return !task.completed;
	// 		}
	// 		return true;
	// 	});
		console.log(toggleCompleted, "toggle");

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : (
				<ul id="list">
					{
					tasks
						.filter((t) => t.content)
						.map((task) => {
							console.log(task, "props, task")
							return (
								<li key={task.id}>
									<input
										type="checkbox"
										name={task.id}
										className="custom-checkbox"
										defaultChecked={task.completed}
										onClick={(event) => {
											console.log("here todo", "toggle");
											 toggleCompleted(task.id);
										}} />
									<label>{task.content}</label>
									<div>
										<img
											src="https://cdn-icons-png.flaticon.com/128/1159/1159633.png"
											className="edit-btn"
											onClick={() => {
												setEditTaskId(task.id);
												setNewTaskContent(task.content);
											} }
											alt="edit-button" />
										<img
											src="https://cdn-icons-png.flaticon.com/128/3096/3096673.png"
											className="delete-btn"
											onClick={() => deleteTask(task.id)}
											alt="delete-button" />
									</div>
								</li>
							);
						})
						}
				</ul>
			)}
		</>
	);
};

export default Todo;
