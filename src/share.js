export const ENTER = 13;

export const ESCAPE = 27;

export const filters = {
	all: () => true,
	active: t => !t.completed,
	completed: t => t.completed
};

export const uuid = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);