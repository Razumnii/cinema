// Меню бургера
// const iconMenu = document.querySelector('.burger__menu');
// if (burger__menu) {
// 	const menuBody = document.querySelector('.menu__body');
// 	iconMenu.addEventListener('click', function (e) {
// 		iconMenu.classList.toggle('_active');
// 		menuBody.classList.toggle('_active');
// 	});
// }

function burgerMenu() {
	const menu = document.querySelector(".header");
	const button = menu.querySelector(".burger-menu__button");
	const links = menu.querySelector(".burger-menu__link");
	const overlay = menu.querySelector(".burger-menu__overlay");


	button.addEventListener("click", (e) => {
		e.preventDefault();
		toggleMenu();
	});
	[].forEach.call(links, function (el) {
		el.addEventListener("click", () => toggleMenu());
	});
	overlay.addEventListener("click", () => toggleMenu());


	function toggleMenu() {
		menu.classList.toggle("burger-menu_active");
		if (menu.classList.contains("burger-menu_active")) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}
}
burgerMenu();