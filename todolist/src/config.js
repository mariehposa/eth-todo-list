export const TODO_LIST_ADDRESS = "0x566137959eEd0bE838f2737C6538923dA1F04f3C";

export const TODO_LIST_ABI = [
	{
		constant: true,
		inputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		name: "tasks",
		outputs: [
			{
				name: "id",
				type: "uint256",
			},
			{
				name: "content",
				type: "string",
			},
			{
				name: "completed",
				type: "bool",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0x8d977672",
	},
	{
		constant: true,
		inputs: [],
		name: "taskCount",
		outputs: [
			{
				name: "",
				type: "uint256",
			},
		],
		payable: false,
		stateMutability: "view",
		type: "function",
		signature: "0xb6cb58a5",
	},
	{
		inputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "constructor",
		signature: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				name: "content",
				type: "string",
			},
			{
				indexed: false,
				name: "completed",
				type: "bool",
			},
		],
		name: "TaskAdded",
		type: "event",
		signature:
			"0x21807e0d6dbaf49ba098938b6b472ebe4bf827bb2f6e95acbef0c69d42ec8439",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				name: "completed",
				type: "bool",
			},
		],
		name: "TaskCompleted",
		type: "event",
		signature:
			"0xe21fa966ca5cd02748c0752352d18c48165e61cb55b4c29cccf924b5a95fcff1",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "id",
				type: "uint256",
			},
			{
				indexed: false,
				name: "content",
				type: "string",
			},
		],
		name: "TaskEdited",
		type: "event",
		signature:
			"0x126a0ea5197c062eb92c789989294eb8d2aef31cf41fd012da26dfab98b29a16",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				name: "id",
				type: "uint256",
			},
		],
		name: "TaskDeleted",
		type: "event",
		signature:
			"0xd078b251d950cc55c44340be1db732337ef4939a76e1367ee271ad2cb19c46af",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_content",
				type: "string",
			},
		],
		name: "addTask",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x67238562",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_id",
				type: "uint256",
			},
		],
		name: "toggleCompleted",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x455f5024",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_id",
				type: "uint256",
			},
			{
				name: "_content",
				type: "string",
			},
		],
		name: "editTask",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0xcb7bd995",
	},
	{
		constant: false,
		inputs: [
			{
				name: "_id",
				type: "uint256",
			},
		],
		name: "deleteTask",
		outputs: [],
		payable: false,
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x560f3192",
	},
];
