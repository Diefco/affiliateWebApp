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
		text: 'Si borras una compra, no podras recuperarla ¿Estas seguro?',
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

function deleteRewards(id) {
	event.preventDefault();

	Swal.fire({
		title: '¿Quieres borrar el premio?',
		text: 'Si borras un premio, no podras recuperarlo ¿Estas seguro?',
		showDenyButton: true,
		showCancelButton: false,
		confirmButtonText: 'Si, borrar',
		denyButtonText: `Cancelar`,
	}).then((result) => {
		if (result.isConfirmed) {
			deleteFetch(url);
			Swal.fire({
				title: 'El premio ha sido borrado.',
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

	const url = '/admin/premios/delete/' + id;

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

/* Actualizar imagen subida por el cliente */

function showPreview(event) {
	if (event.target.files.length > 0) {
		var src = URL.createObjectURL(event.target.files[0]);
		var preview = document.querySelector('#img-preview img');
		preview.src = src;
	}
}

/* set date en datepicker */
function setDatepicker() {
	const dateInput = document.querySelector('.datepicker');
	if (dateInput) {
		const dateValue = dateInput.getAttribute('data-value');
		setTimeout(() => {
			dateInput.value = dateValue;
		}, 300);
	}
}

setDatepicker();

const adminPedidoCart = [];
function toggleCart(id) {
	const inputCart = document.querySelector('#inCart');
	const reward = document.querySelector(`#addCart-${id}`);
	const rewardIcon = reward.querySelector('i');

	const inCart = reward.getAttribute('data-incart');

	if (inCart === 'false') {
		// el premio no se ha añadido.
		reward.classList.remove('border-cBlue');
		reward.classList.remove('hover:text-cBlue');
		reward.classList.remove('bg-cBlue');
		rewardIcon.classList.remove('fa-plus');

		reward.classList.add('border-cPink');
		reward.classList.add('hover:text-cPink');
		reward.classList.add('bg-cPink');
		rewardIcon.classList.add('fa-minus');

		reward.setAttribute('data-incart', 'true');

		adminPedidoCart.push(id);
	} else {
		// El premio esta en el "carrito"
		reward.classList.remove('border-cPink');
		reward.classList.remove('hover:text-cPink');
		reward.classList.remove('bg-cPink');
		rewardIcon.classList.remove('fa-minus');

		reward.classList.add('border-cBlue');
		reward.classList.add('hover:text-cBlue');
		reward.classList.add('bg-cBlue');
		rewardIcon.classList.add('fa-plus');

		reward.setAttribute('data-incart', 'false');

		for (let i = 0; i < adminPedidoCart.length; i++) {
			actualItem = adminPedidoCart[i];
			if (actualItem === id) {
				adminPedidoCart.splice(i, 1);
			}
		}
	}

	inputCart.setAttribute('value', adminPedidoCart);
}

function loadCart() {
	const inputCart = document.querySelector('#inCart');
	const inputCartValue = inputCart.getAttribute('value');
	const inputCartArray = inputCartValue.split(',');

	setTimeout(() => {
		inputCartArray.forEach((id) => {
			const reward = document.querySelector(`#addCart-${id}`);
			if (reward) {
				const rewardIcon = reward.querySelector('i');

				reward.classList.remove('border-cBlue');
				reward.classList.remove('hover:text-cBlue');
				reward.classList.remove('bg-cBlue');
				rewardIcon.classList.remove('fa-plus');

				reward.classList.add('border-cPink');
				reward.classList.add('hover:text-cPink');
				reward.classList.add('bg-cPink');
				rewardIcon.classList.add('fa-minus');

				reward.setAttribute('data-incart', 'true');
			}
		});
	}, 1000);
}

/* Carrito premios cliente */
let pointsAvailable;
let selectedReward = [];

window.addEventListener('load', () => {
	document.querySelectorAll('.reward-button').forEach((element) => {
		element.classList.remove('invisible');
	});
	const puntosDiv = document.querySelector('#points');
	if (puntosDiv) {
		const puntos = puntosDiv.getAttribute('data-points');
		return (pointsAvailable = parseInt(puntos));
	}
});

function toggleCartClient(id) {
	/* Zona carrito */
	const pointsDiv = document.querySelector('#points');
	const noRewardCart = document.querySelector('#no-rewards');
	const rewardCart = document.querySelector('#rewardCart');
	const rewardCartList = document.querySelector('#cartList');
	/* Article del premio */
	const rewardButton = document.querySelector(`#addCart-${id}`);
	const inCart = rewardButton.getAttribute('data-incart');
	const reward = document.querySelector(`#reward-${id}`);
	const rewardTitle = reward.querySelector('.reward-title').textContent;
	const rewardPoints = parseInt(
		reward.querySelector('.reward-points').getAttribute('data-points')
	);

	if (inCart === 'false') {
		if (pointsAvailable >= rewardPoints) {
			// el premio no se ha añadido.
			rewardButton.innerHTML = 'Quitar premio';
			rewardButton.setAttribute('data-incart', 'true');
			noRewardCart.classList.add('hidden');
			rewardCart.classList.remove('hidden');

			// Agregamos los rewards al carrito
			rewardCartList.innerHTML += `<li class="for-reward-${id} p-2 text-sm">
					<span class="text-cPink">+</span> 
					${rewardTitle} 
					<strong class="">${rewardPoints} Pts.</strong>
				</li>`;

			// restamos los puntos disponibles
			pointsAvailable = pointsAvailable - rewardPoints;
			pointsDiv.innerHTML = pointsAvailable;

			// agregamos al array del id reward
			selectedReward.push(id);
		} else {
			Swal.fire({
				title: 'No tienes puntos suficientes',
				text: 'Parece que no tienes los puntos necesarios para agregar este premio al carrito.',
				icon: 'info',
				showConfirmButton: true,
				confirmButtonColor: '#233789',
				timer: 2000,
			});
		}
	} else {
		// El premio esta en el "carrito"
		rewardButton.innerHTML = 'Agregar premio';
		rewardButton.setAttribute('data-incart', 'false');

		// restamos los puntos disponibles
		pointsAvailable = pointsAvailable + rewardPoints;
		pointsDiv.innerHTML = pointsAvailable;

		// borramos el <li> del carrito carrito
		document.querySelector(`.for-reward-${id}`).remove();

		// recorremos el array en busca del id para borrar su posicion
		for (let i = 0; i < selectedReward.length; i++) {
			let actualItem = selectedReward[i];
			if (actualItem === id) {
				selectedReward.splice(i, 1);
			}
		}

		// Validamos si el carrito queda vacio
		if (selectedReward.length === 0) {
			noRewardCart.classList.remove('hidden');
			rewardCart.classList.add('hidden');
		}
	}
}

function sendCart(element) {
	const modal = document.querySelector('#modal-info');
	const inputOrderArray = document.querySelector('#inOrder');

	modal.classList.add('flex');
	modal.classList.remove('hidden');
	modal.setAttribute('data-visible', 'true');

	inputOrderArray.value = selectedReward;
}

function closeModal() {
	const modal = document.querySelector('#modal-info');

	modal.classList.add('hidden');
	modal.classList.remove('flex');
	modal.setAttribute('data-visible', 'false');
}
