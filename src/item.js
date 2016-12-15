import {ENTER, ESCAPE, link} from './share';

// const ref = dio.stream();

function handleKeys(d, e) {
	if (e.which === ENTER) {
		return e.target.blur();
	}
	if (e.which === ESCAPE) {
		e.target.value = d.title;
		return e.target.blur();
	}
}

export default function Item({d, edits, doFocus, doToggle, doRemove, doEdit}) {
	let cls = '';
	edits && (cls += ' editing');
	d.completed && (cls += ' completed');

	return (
		<li className={ cls }>
			<div className="view">
				<input className="toggle" type="checkbox"
					checked={ d.completed } onClick={ link(d, doToggle) }
				/>
				<label onDblClick={ link(d, doFocus) }>{ d.title }</label>
				<button className="destroy" onClick={ link(d, doRemove) } />
			</div>

			<input className="edit"
				value={ d.title }
				onblur={ link(d, doEdit) }
				onkeydown={ link(d, handleKeys) }
			/>
		</li>
	);
}
