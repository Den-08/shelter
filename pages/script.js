const burger = document.querySelector('.burger');
const body = document.body;

burger.addEventListener('click', burgerClick);

function burgerClick() {
    burger.classList.toggle("burger_active");
    body.classList.toggle("noscroll");
};