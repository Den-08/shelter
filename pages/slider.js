const sliderLine = document.querySelector('.slider__line');
const sliderPrev = document.querySelectorAll('.slider__prev');
const sliderNext = document.querySelector('.slider__next');
const sliderCard = document.querySelector('.slider__card');

let sliderOffset = 0; // смещение слайдов от левого края
let sliderCardWidth // = Number(window.getComputedStyle(sliderCard).width.slice(0, -2)); // ширина слайда
let sliderLineColumnGap // = Number(window.getComputedStyle(sliderLine).columnGap.slice(0, -2));   // ширина между слайдами
let sliderMove // = sliderCardWidth + sliderLineColumnGap; // шаг смещения слайдов

window.addEventListener('DOMContentLoaded', funcSliderInit);
sliderNext.addEventListener('click', () => { funcSliderMove(sliderMove) });
sliderPrev.forEach((i) => i.addEventListener('click', () => { funcSliderMove(-sliderMove) }));

function funcSliderInit() {
    sliderCardWidth = Number(window.getComputedStyle(sliderCard).width.slice(0, -2)); // ширина слайда
    sliderLineColumnGap = Number(window.getComputedStyle(sliderLine).columnGap.slice(0, -2));   // ширина между слайдами
    sliderMove = sliderCardWidth + sliderLineColumnGap; // шаг смещения слайдов
    // console.log(sliderMove);
}

function funcSliderMove(sliderMove) {
    sliderOffset = sliderOffset - sliderMove;
    sliderLine.style.left = `${sliderOffset}px`;
    // console.log(sliderOffset);
}