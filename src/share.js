export const ENTER = 13;

export const ESCAPE = 27;

export const filters = {
	all: () => true,
	active: t => !t.completed,
	completed: t => t.completed
};
