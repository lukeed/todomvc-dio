import {ENTER, filters, plural} from './share';
import Model from './model';
import Item from './item';

const store = dio.createStore(Model);
const dispatch = (type, val) => store.dispatch({type, val});

function addItem(e) {
	if (e.which !== ENTER) {
		return;
	}
	const val = e.target.value.trim();
	if (val) {
		dispatch('add', val);
		e.target.value = '';
	}
}

function toggleOne(d) {
	dispatch('toggle', d.id);
}

function toggleAll() {
	dispatch('toggles', this.checked);
}

function removeOne(d) {
	dispatch('remove', d.id);
}

function removeAll() {
	dispatch('removes');
}

const App = () => ({
	getInitialState: () => ({route: 'all', focus: null}),

	componentWillReceiveProps: p => {
		p.todos = store.getState().todos;
	},

	focus: function (d) {
		this.setState({focus: d.id});
	},

	edit: function (d, e) {
		const val = e.target.value.trim();
		val ? dispatch('edit', {id: d.id, title: val}) : removeOne(d);
		this.setState({focus: null});
	},

	render: function ({todos}, {route, focus}) {
		const self = this;
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
									edits: focus == t.id,
									doEdit: self.edit,
									doFocus: self.focus,
									doToggle: toggleOne,
									doRemove: removeOne
								}))
						) }
					</section>
				) : null }

				{ (numDone || numActive) ? (
					<footer className="footer">
						<span className="todo-count">
							<strong>{ numActive }</strong> { plural(numActive, 'item') } left
						</span>
						<ul className="filters">
						</ul>
						{ numDone && <button className="clear-completed" onClick={ removeAll }>Clear completed</button> }
					</footer>
				) : null }
			</div>
		);
	}
});

const render = dio.render(App, '#app');

store.connect(render);

dio.router({'/:filter': render});
