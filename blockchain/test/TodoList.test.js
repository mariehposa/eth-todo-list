const TodoList = artifacts.require("./TodoList.sol");

contract("TodoList", (accounts) => {
	before(async () => {
		todoList = await TodoList.deployed();
	});

	it("deploys successfully", async () => {
		const address = await todoList.address;
		assert.notEqual(address, 0x0);
		assert.notEqual(address, "");
		assert.notEqual(address, null);
		assert.notEqual(address, undefined);
	});

	it("lists tasks", async () => {
		const taskCount = await todoList.taskCount();
		const task = await todoList.tasks(taskCount);
		assert.equal(task.id.toNumber(), taskCount.toNumber());
		assert.equal(task.content, "Visit Mdx");
		assert.equal(task.completed, false);
		assert.equal(taskCount.toNumber(), 1);
	});

	it("creates tasks", async () => {
        // Add task
		const result = await todoList.addTask("A new task");

        // Verify the task has been created
		const taskCount = await todoList.taskCount();
		assert.equal(taskCount, 2);

        // Verify the emitted event
		const event = result.logs[0].args;
		assert.equal(event.id.toNumber(), 2);
		assert.equal(event.content, "A new task");
		assert.equal(event.completed, false);
	});

	it("toggles task completion", async () => {
        // Toggle the task status
		const result = await todoList.toggleCompleted(1);

        // Verify the task status has been updated
		const task = await todoList.tasks(1);
		assert.equal(task.completed, true);

        // Verify the emitted event
		const event = result.logs[0].args;
		assert.equal(event.id.toNumber(), 1);
		assert.equal(event.completed, true);
	});

	it("edits a task", async () => {
		const taskId = 1;
		const newContent = "Updated task content";

		// Edit the task
		const result = await todoList.editTask(taskId, newContent);

		// Verify the task has been updated
		const task = await todoList.tasks(taskId);
		assert.equal(task.content, newContent);

		// Verify the emitted event
		const event = result.logs[0].args;
		assert.equal(event.id.toNumber(), taskId);
		assert.equal(event.content, newContent);
	});

	it("deletes a task", async () => {
		const taskId = 1;

		// Delete the task
		const result = await todoList.deleteTask(taskId);

		// Verify the task has been deleted
		const task = await todoList.tasks(taskId);
		assert.equal(task.id, 0);

		// Verify the task count has been updated
		const taskCount = await todoList.taskCount();
		assert.equal(taskCount, 1);

		// Verify the emitted event
		const event = result.logs[0].args;
		assert.equal(event.id.toNumber(), taskId);
	});
});
