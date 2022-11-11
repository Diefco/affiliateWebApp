function Openbar() {
	const sidebar = document.querySelector('.sidebar');
	const iconMenu = document.querySelector('#icon-menu i');

	sidebar.classList.toggle('left-[-15rem]');
	sidebar.classList.toggle('left-0');

	iconMenu.classList.toggle('fa-bars-staggered');
	iconMenu.classList.toggle('fa-x');
}
