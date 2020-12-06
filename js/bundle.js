/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
const cards = __webpack_require__(/*! ./cards */ "./js/modules/cards.js");

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 80;
            this.changeToRUB(); // конвертируем в рубли
        }

        changeToRUB() { // конвертер курса
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) { // если вдруг класс забыли написать
                this.classes.push('menu__item');
            }
            this.classes.forEach(className => element.classList.add(className)); // если мы добавляем кучу новых классов карточке
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu') // данные по карточкам 
        .then(data => { // берём данные с сервера и в цикле у каждого массива
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => { // деструктуризация объекта
                new MenuCard(
                    img,
                    altimg,
                    title,
                    descr,
                    price,
                    '.menu .container',
                    'menu__item',
                ).render(); // создаем объекты и рендерим данные с сервера
            });
        });


    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => { // деструктуризация объекта
    //             new MenuCard(
    //                 img,
    //                 altimg,
    //                 title,
    //                 descr,
    //                 price,
    //                 '.menu .container',
    //                 'menu__item',
    //             ).render(); // создаем объекты и рендерим данные с сервера
    //         });
    //     });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




function forms(formSelector, modalTimerId) {
    // FORMS

    const forms = document.querySelectorAll(formSelector); //получаем все формы
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Скоро с вами свяжемся',
        failure: 'что то пошло не так...'
    };

    forms.forEach(form => bindPostData(form)); //запускаем функцию к каждой форме

    function bindPostData(form) { //
        form.addEventListener('submit', (event) => {
            event.preventDefault(); //отключаем перезагрузку

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: auto;
            `;
            // добавляем в форму спиннер
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            //превращаем в JSON объект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.succes);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset(); // очистка полей формы после удачной загрузки
                });

        });
    }


    function showThanksModal(message) { //функция показа благодарсности 
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // прячем текущее модальное окно
        (0,_modals__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modals__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "openModal": () => /* binding */ openModal,
/* harmony export */   "closeModal": () => /* binding */ closeModal
/* harmony export */ });
function openModal(modalWindowSelector, modalTimerId) { // функция открытия окна
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.add('show'); // класс показа окна
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden'; // при открытом окне задний фон не прокручивается
    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); // Если пользователь сам открыл окно, то не вызвывать его
    }

}

function closeModal(modalWindowSelector) { // функция закрытия окна
    const modalWindow = document.querySelector(modalWindowSelector);
    modalWindow.classList.remove('show'); // класс показа окна удаляем
    modalWindow.classList.add('hide');
    document.body.style.overflow = ''; //чтобы скрол страницы опять заработал
}

function modals(buttonsClickSelector, modalWindowSelector, modalTimerId) {
    // Modal window

    const buttonsClick = document.querySelectorAll(buttonsClickSelector);
    const modalWindow = document.querySelector(modalWindowSelector);

    buttonsClick.forEach(button => { // при нажатии на кнопку открываем окно
        button.addEventListener('click', () => openModal(modalWindowSelector, modalTimerId));
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target == modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal(modalWindowSelector);
        } // если сзади окна нажи мышкой закрываем или на крестик
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal(modalWindowSelector);
        } // если клаву escape нажали закрываем
    });

    function showModalByScroll() { // показываем окно когда скролим вниз до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // если прокрученно до конца
            openModal(modalWindowSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        } // делаем это один раз  и убираем событие
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modals);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function sliders({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {

    //
    const sliders = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const next = document.querySelector(nextArrow);
    const prev = document.querySelector(prevArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slidesField = document.querySelector(field);

    let offset = 0;
    let slideIndex = 1;

    if (sliders.length < 10) {
        total.textContent = `0${sliders.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = sliders.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * sliders.length + '%'; // общая ширина обёртки
    slidesField.style.display = 'flex'; // чтобы стали по горизонтали
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; //скрываем элементы которые не попадают в область видимости

    sliders.forEach(slide => { // каждому слайду ширину обёртки
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function goSlide() {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });

        dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == sliders.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        goSlide();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (sliders.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }

        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        goSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translate(-${offset}px)`;

            if (sliders.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            goSlide();
        });
    });

    // Slider простой вариант слайда

    // const sliders = document.querySelectorAll('.offer__slide');
    // const current = document.querySelector('#current');
    // const total = document.querySelector('#total');

    // function hideSlide() { // удаляем слайды
    //     sliders.forEach(slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     });
    // }

    // function showSlide(i = 0) { // показываем слайды
    //     sliders[i].classList.add('show', 'fade');
    //     sliders[i].classList.remove('hide');
    //     current.textContent = getZero(i + 1);
    //     total.textContent = getZero(sliders.length);
    // }

    // function hideShow(i) { // удаляем и показываем слайды по индексу
    //     hideSlide();
    //     showSlide(i);
    // }

    // function choiceSlide() { // выбираем индексы и запускаем показ слайдов
    //     const next = document.querySelector('.offer__slider-next');
    //     const prev = document.querySelector('.offer__slider-prev');
    //     let i = 0;
    //     next.addEventListener('click', () => {
    //         i++;
    //         if (i == sliders.length) {
    //             i = 0;
    //         }
    //         hideShow(i);
    //     });

    //     prev.addEventListener('click', () => { //
    //         i--;
    //         if (i < 0) {
    //             i = 3;
    //         }
    //         hideShow(i);
    //     });
    // }

    // hideSlide(); // первый старт удаление слайдов
    // showSlide(); // показ слайдов
    // choiceSlide(); // выбор индекса слайда
    //======================================
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, ActiveClass) {
    // Tabs Content

    const tabsContent = document.querySelectorAll(tabsSelector); // контент табов
    const tabs = document.querySelectorAll(tabsContentSelector); // список
    const tabsParent = document.querySelector(tabsParentSelector); // общее меню


    function hideTabcontent() { // стираем весь контент 
        tabsContent.forEach(content => {
            content.classList.add('hide'); // добавляеам класс и прячем контент
            content.classList.remove('show', 'fade'); // класс показа плавно убираем
        });
        tabs.forEach(tab => {
            tab.classList.remove(ActiveClass);
        }); // снимаем выделение с меню
    }


    function showTabContent(i = 0) { // показ контента и выделение меню
        tabsContent[i].classList.add('show', 'fade'); // плавно добавляем показ
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    } // и в меню добавляем выделение

    function choiceTab() { // на какой пункт меню щелкнули
        tabsParent.addEventListener('click', (event) => {
            const target = event.target; // див с щелчком

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((tab, i) => {
                    if (tab == target) { // сравнение со списком дивов
                        hideTabcontent(); // удаление старого
                        showTabContent(i); // запуск нового на который щелкнули
                    }
                });
            }
        });
    }

    hideTabcontent();
    showTabContent();
    choiceTab();

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(id, deadLine) {
    //Timer 

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()); // осталось времени в милисекундах
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // милисекунды разницы делим на милисекунды в день
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // милисекунды разницы  делим на милисекунды час и ост от деления 24 часа
        const minutes = Math.floor((t / 1000 / 60) % 60); // милисекунды разницы делим секунды делим минуты и остаток от часа 
        const seconds = Math.floor((t / 1000) % 60); // милисекунды разница делим на секунды остаток от минуты

        return {
            'total': t, // эта штука нужна чтобы остановить таймер, когда закончится разница
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };
    }

    function getZero(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector); // цепляемся за все элементы
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000); // c интервалом 1 секунду узнаем разницу и заполняем селекторы

        updateClock(); // чтобы задержки не было первый запуск в ручную

        function updateClock() {
            const t = getTimeRemaining(endTime); // объект с данными
            days.textContent = getZero(t.days); // заполняем все селекторы
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) { // если уже нет разницы то отключаем таймер
                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadLine);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");









document.addEventListener('DOMContentLoaded', () => {
    // run function
    const modalTimerId = setTimeout(() => (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 5000); // через 5 секунд запускать модальное окно

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modals__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-11-10');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
    (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_6__.default)({
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

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResource": () => /* binding */ getResource
/* harmony export */ });
const postData = async (url, data) => { // Постим запросы с формы
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data // JSON объект
    });
    return await res.json();
};

const getResource = async (url) => { // получаем данные для карты c сервера  , функция асинхронная
    const res = await fetch(url);
    if (!res.ok) { // в случае если get запрос не пройдёт
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json(); // 
};





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map