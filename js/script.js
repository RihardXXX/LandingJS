// const { request } = require("express");

document.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const modals = require('./modules/modals');
    const timer = require('./modules/timer');
    const cards = require('./modules/cards');
    const calculator = require('./modules/calculator');
    const forms = require('./modules/forms');
    const sliders = require('./modules/sliders');


    // run function

    tabs();
    modals();
    timer();
    cards();
    calculator();
    forms();
    sliders();

});