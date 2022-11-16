function Openbar() {
	const sidebar = document.querySelector('.sidebar');
	const iconMenu = document.querySelector('#icon-menu i');

	sidebar.classList.toggle('left-[-15rem]');
	sidebar.classList.toggle('left-0');

	iconMenu.classList.toggle('fa-bars-staggered');
	iconMenu.classList.toggle('fa-x');
}

function deleteClient(id) {
	event.preventDefault();

	Swal.fire({
		title: '¿Quieres borrar un cliente?',
		text: 'Si borras un cliente, no podras recuperarlo ¿Estas seguro?',
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: 'Si, borrar',
		denyButtonText: `Cancelar`,
	}).then((result) => {
		if (result.isConfirmed) {
			deleteFetch(url);
			Swal.fire({
				title: 'El cliente ha sido borrado.',
				icon: 'info',
				timer: '5000',
				showConfirmButton: true,
			}).then(() => {
				window.location.reload();
			});
		} else if (result.isDenied) {
			Swal.fire('No se realizo ninguna acción.', '', 'info');
		}
	});

	const url = '/admin/clientes/delete/' + id;

	async function deleteFetch(url) {
		// Opciones por defecto estan marcadas con un *
		const response = await fetch(url, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}
}
function deletePurchase(id) {
	event.preventDefault();

	Swal.fire({
		title: '¿Quieres borrar la compra?',
		text: 'Si borras una compra, no podras recuperarl ¿Estas seguro?',
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: 'Si, borrar',
		denyButtonText: `Cancelar`,
	}).then((result) => {
		if (result.isConfirmed) {
			deleteFetch(url);
			Swal.fire({
				title: 'La compra ha sido borrada.',
				icon: 'info',
				timer: '5000',
				showConfirmButton: true,
			}).then(() => {
				window.location.reload();
			});
		} else if (result.isDenied) {
			Swal.fire('No se realizo ninguna acción.', '', 'info');
		}
	});

	const url = '/admin/compras/delete/' + id;

	async function deleteFetch(url) {
		// Opciones por defecto estan marcadas con un *
		const response = await fetch(url, {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}
}
