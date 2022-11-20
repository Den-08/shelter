const sliderLine = document.querySelector('.slider__line');
const sliderPrev = document.querySelectorAll('.slider__prev');
const sliderNext = document.querySelector('.slider__next');
const sliderCards = document.querySelectorAll('.slider__card');

let sliderOffsetClicks = 0; // суммарное количество смещений

function funcSliderWidth() {
    let sliderCardWidth = Number(window.getComputedStyle(sliderCards[0]).width.slice(0, -2)); // ширина 1 слайда
    let sliderLineColumnGap = Number(window.getComputedStyle(sliderLine).columnGap.slice(0, -2));   // ширина между слайдами
    let sliderMove = sliderCardWidth + sliderLineColumnGap; // шаг смещения слайдов
    return sliderMove;
}

function funcSliderRender(clicksCount) {
    let sliderOffset = clicksCount * funcSliderWidth();
    sliderLine.style.left = `${sliderOffset}px`;
    if (clicksCount === 0) { sliderPrev.forEach((i) => i.classList.add('inactive')) } else { sliderPrev.forEach((i) => i.classList.remove('inactive')) };
    if (clicksCount === (-(sliderCards.length - funcSliderViewed()))) { sliderNext.classList.add('inactive') } else { sliderNext.classList.remove('inactive') }
}

function funcSliderMove(clicksNumber) {
    sliderOffsetClicks = sliderOffsetClicks - clicksNumber;
    funcSliderRender(sliderOffsetClicks);
}

function funcSliderNext() {
    if (-sliderOffsetClicks < (sliderCards.length - funcSliderViewed())) { funcSliderMove(1); }
}

function funcSliderPrev() {
    if (sliderOffsetClicks < 0) { funcSliderMove(-1); }
}

function funcSliderViewed() {
    let sliderLineWidthViewed = Number(window.getComputedStyle(sliderLine).width.slice(0, -2));   // ширина строки со слайдами
    let sliderCardWidthViewed = Number(window.getComputedStyle(sliderCards[0]).width.slice(0, -2)); // ширина 1 слайда
    let sliderLineColumnGap = Number(window.getComputedStyle(sliderLine).columnGap.slice(0, -2));   // ширина между слайдами
    let viewed = (sliderLineWidthViewed - sliderLineWidthViewed % sliderCardWidthViewed) / sliderCardWidthViewed;
    return viewed;
}

funcSliderRender(sliderOffsetClicks);
// обработчики событий
window.addEventListener('resize', () => {
    funcSliderRender(sliderOffsetClicks);
});
sliderNext.addEventListener('click', () => { funcSliderNext() });
sliderPrev.forEach((i) => i.addEventListener('click', () => { funcSliderPrev() }));
