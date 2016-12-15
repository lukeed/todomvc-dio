import {ENTER, filters} from './share';
import Model from './model';
import Item from './item';

const store = dio.createStore(Model);

function addItem(e) {
	if (e.which !== ENTER) {
		return;
	}
	const val = e.target.value.trim();
	if (val) {
		store.dispatch({type: 'add', val: val});
		e.target.value = '';
	}
}

function toggleOne() {
	store.dispatch({type: 'toggle', id: this.id});
}

function toggleAll() {
	store.dispatch({type: 'toggles', val: this.checked});
}

function removeOne(d) {
	store.dispatch({type: 'remove', id: d.id});
}

const App = () => ({
	getInitialState: () => ({route: 'all'}),

	componentWillReceiveProps: p => {
		p.todos = store.getState().todos;
	},

	render: ({todos}, {route}) => {
		const num = todos.length;
		const shown = todos.filter(filters[route]);
		const numDone = todos.filter(filters.completed).length;
		const numActive = num - numDone;

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input className="new-todo"
						autofocus autocomplete="off"
						placeholder="What needs to be done?"
						onkeydown={ addItem }
					/>
				</header>

				{ todos.length ? (
					<section className="main">
						<input className="toggle-all" type="checkbox"
							onChange={ toggleAll } checked={ numActive === 0 }
						/>
						{ h('ul',
								{className: 'todo-list'},
								shown.map(t => Item({
									d: t,
									doToggle: toggleOne,
									doRemove: removeOne
								}))
						) }
					</section>
				) : null }
			</div>
		);
	}
});

const render = dio.render(App, '#app');

store.connect(render);

dio.router({'/:filter': render});