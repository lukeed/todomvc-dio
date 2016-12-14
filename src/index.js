import {ENTER, filters} from './share';
// import Model from './model';

// const store = dio.createStore(Model);
const store = {dispatch: function () {}};

function addItem(e) {
	if (e.which !== ENTER) return;
	const val = e.target.value.trim();
	store.dispatch({type: 'add'});
}

const App = () => ({
	getInitialState: () => ({route: 'all'}),

	componentWillReceiveProps: p => {
		p.todos = [];
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

						<ul className="todo-list">
							{ shown.map(t => <Item d={t} />) }
						</ul>
					</section>
				) : null }
			</div>
		);
	}
});

// store.connect(App, '#app');
dio.render(App, document.getElementById('app'));