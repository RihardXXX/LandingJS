const cards = require("./cards");

function calculator() {
    // calculator

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    // если мы до этого выбирали пол и активность берём с локального хранилища
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    function initLocalSettings(selector, activeClass) { // функция для выделения кнопки
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() { // формула раситывающая каллории
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0000';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) { // работаем с полом и активностью клиента
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // чтобы запоминал активность
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                } // чтобы запоминал пол

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }


    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(selector) { // работаем с инпутами
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) { // если пользователь ввёл не число
                input.style.border = '2px solid red';
                getDinamicInformation(selector);
            } else {
                input.style.border = 'none'; // если ввёл нормально то делаем рамку как раньше
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });

    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');

}

module.exports = calculator;