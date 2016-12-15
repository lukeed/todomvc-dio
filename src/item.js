function doFocus(e) {
	console.log('edit item', e);
}

function link(data, cb) {
	return function (e) {
		return cb.apply(this, [data, e]);
	};
}

export default function Item({d, doToggle, doRemove}) {
	return (
		<li className="test">
			<div className="view">
				<input className="toggle" type="checkbox"
					checked={ d.completed } onClick={ link(d, doToggle) }
				/>
				<label onDblClick={ doFocus }>{ d.title }</label>
				<button className="destroy" onClick={ link(d, doRemove) } />
			</div>
		</li>
	);
}

