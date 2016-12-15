function doFocus(e) {
	console.log('edit item', e);
}

export default function Item({d, doToggle, doRemove}) {
	return (
		<li className="test">
			<div className="view">
				<input id={ d.id } className="toggle"
					type="checkbox" checked={ d.completed }
					onClick={ doToggle } />
				<label onDblClick={ doFocus }>{ d.title }</label>
				<button className="destroy" onClick={ doRemove } />
			</div>
		</li>
	);
}

