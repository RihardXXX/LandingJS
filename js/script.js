import tabs from './modules/tabs';
import modals from './modules/modals';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import sliders from './modules/sliders';
import {
    openModal
} from './modules/modals';

document.addEventListener('DOMContentLoaded', () => {
    // run function
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000); // через 5 секунд запускать модальное окно

    tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    modals('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-11-10');
    cards();
    calculator();
    forms('form', modalTimerId);
    sliders({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});