import {link} from './share';

function doFocus(e) {
	console.log('edit item', e);
}

export default function Item({d, edits, doFocus, doToggle, doRemove}) {
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
		</li>
	);
}

