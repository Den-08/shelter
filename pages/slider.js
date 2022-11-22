const sliderArea = document.querySelector('.slider__area');

const sliderLine = document.querySelector('.slider__line');
const sliderCards = document.querySelectorAll('.slider__card');

const sliderPrev = document.querySelectorAll('.slider__prev');
const sliderNext = document.querySelector('.slider__next');
const sliderNum = document.querySelector('.slider__num');

let sliderOffsetClicks = 0; // суммарное количество смещений

function funcSliderStep() {
    let sliderCardWidth = Number(window.getComputedStyle(sliderCards[0]).width.slice(0, -2)); // ширина 1 слайда
    let sliderLineColumnGap = Number(window.getComputedStyle(sliderLine).columnGap.slice(0, -2));   // ширина между слайдами
    let sliderMove = sliderCardWidth + sliderLineColumnGap; // шаг смещения слайдов
    return sliderMove;
}

function funcSliderRender(clicksCount) {
    let sliderOffset = clicksCount * funcSliderStep();
    sliderLine.style.left = `${sliderOffset}px`;
    if (clicksCount === 0) { sliderPrev.forEach((i) => i.classList.add('inactive')) } else { sliderPrev.forEach((i) => i.classList.remove('inactive')) };
    if (funcSliderVisible(sliderArea, sliderCards[sliderCards.length - 1])) { sliderNext.classList.add('inactive') } else { sliderNext.classList.remove('inactive') }; // clicksCount === (-(sliderCards.length - funcSliderViewed()))
    if (sliderNum) { sliderNum.textContent = sliderOffsetClicks * (-1) + 1; };
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
    let viewed = (sliderLineWidthViewed - sliderLineWidthViewed % sliderCardWidthViewed) / sliderCardWidthViewed; // количество отображаемых слайдов в строке
    return viewed;
}

function funcSliderVisible(elemArea, elemCard, pixDelta) {
    if (!pixDelta) { pixDelta = 1 };
    if (elemArea.getBoundingClientRect) {
        // для elemArea
        let elemAreaLeft = elemArea.getBoundingClientRect().left;
        let elemAreaRight = elemArea.getBoundingClientRect().right;
        let elemAreaTop = elemArea.getBoundingClientRect().top;
        let elemAreaBottom = elemArea.getBoundingClientRect().bottom;
        // для elemCard
        let elemCardLeft = elemCard.getBoundingClientRect().left;
        let elemCardRight = elemCard.getBoundingClientRect().right;
        let elemCardTop = elemCard.getBoundingClientRect().top;
        let elemCardBottom = elemCard.getBoundingClientRect().bottom;
        // проверка размещения elemCard внутри elemArea с погрешностью pixDelta
        if (elemCardLeft >= (elemAreaLeft - pixDelta) && elemCardRight <= (elemAreaRight + pixDelta) && elemCardTop >= (elemAreaTop - pixDelta) && elemCardBottom <= (elemAreaBottom + pixDelta)) {
            return true
        } else return false
    }
}

// первичная отрисовка слайдера
funcSliderRender(sliderOffsetClicks);

// обработчики событий
window.addEventListener('resize', () => {
    funcSliderRender(sliderOffsetClicks);
});
sliderNext.addEventListener('click', (e) => { if (!e.currentTarget.classList.contains('inactive')) { funcSliderNext(); } });
sliderPrev.forEach((i) => i.addEventListener('click', (e) => { if (!e.currentTarget.classList.contains('inactive')) { funcSliderPrev(); } }));
