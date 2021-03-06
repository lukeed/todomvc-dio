import {uuid} from './share';

const KEYID = 'todos-dio';
const STORE = localStorage;

function getData() {
	const s = STORE[KEYID];
	return {todos: s && JSON.parse(s) || []};
}

function setData(data) {
	STORE[KEYID] = JSON.stringify(data);
	return {todos: data};
}

export default function (state, action) {
	state = state || getData();

	const val = action.val;

	// const put = obj => setData(
	// 	state.todos.map(t => t.id !== id ? t : Object.assign({}, t, obj))
	// );

	switch (action.type) {
		case 'add':
			return setData(
				state.todos.concat({id: uuid(), title: val, completed: false})
			);
		case 'edit':
			return setData(
				state.todos.map(t => t.id !== val.id ? t : Object.assign(t, {title: val.title}))
			);
		case 'toggle':
			return setData(
				state.todos.map(t => t.id !== val ? t : Object.assign(t, {completed: !t.completed}))
			);
		case 'toggles':
			return setData(
				state.todos.map(t => Object.assign(t, {completed: action.val}))
			);
		case 'remove':
			return setData(
				state.todos.filter(t => t.id !== val)
			);
		case 'removes':
			return setData(
				state.todos.filter(t => !t.completed)
			);
		default:
			return state;
	}
}
