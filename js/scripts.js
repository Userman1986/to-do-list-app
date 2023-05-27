$(document).ready(function() {
	$('#button').on('click', function() {
		let itemText = $('#input').val();
		if (itemText !== '') {
			let item = $('<li>').text(itemText);
			$('#list').append(item);

			$('#input').val('');

			item.on('dblclick', function() {
				item.toggleClass('strike');
			});

			let deleteButton = $('<crossOutButton>').text('X');
			item.append(deleteButton);

			deleteButton.on('click', function() {
				item.remove();
			});

			$('#list').sortable();
		}
	});
});
