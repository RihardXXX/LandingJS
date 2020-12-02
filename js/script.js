// const { request } = require("express");

document.addEventListener('DOMContentLoaded', () => {


    // Tabs Content

    const tabs = document.querySelectorAll('.tabheader__item'); // список
    const tabsContent = document.querySelectorAll('.tabcontent'); // контент табов
    const tabsParent = document.querySelector('.tabheader__items'); // общее меню


    function hideTabcontent() { // стираем весь контент 
        tabsContent.forEach(content => {
            content.classList.add('hide'); // добавляеам класс и прячем контент
            content.classList.remove('show', 'fade'); // класс показа плавно убираем
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
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



    //Timer 

    const deadLine = '2020-12-21';

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

    setClock('.timer', deadLine);



    // Modal window

    const buttonsClick = document.querySelectorAll('[data-modal]');
    const modalWindow = document.querySelector('.modal');


    function openModal() { // функция открытия окна
        modalWindow.classList.add('show'); // класс показа окна
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // при открытом окне задний фон не прокручивается
        clearInterval(modalTimerId); // Если пользователь сам открыл окно, то не вызвывать его
    }

    function closeModal() { // функция закрытия окна
        modalWindow.classList.remove('show'); // класс показа окна удаляем
        modalWindow.classList.add('hide');
        document.body.style.overflow = ''; //чтобы скрол страницы опять заработал
    }

    buttonsClick.forEach(button => { // при нажатии на кнопку открываем окно
        button.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (event) => {
        if (event.target == modalWindow || event.target.getAttribute('data-close') == '') {
            closeModal();
        } // если сзади окна нажи мышкой закрываем или на крестик
    });

    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        } // если клаву escape нажали закрываем
    });

    // const modalTimerId = setTimeout(openModal, 50000); // через 5 секунд запускать модальное окно

    function showModalByScroll() { // показываем окно когда скролим вниз до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // если прокрученно до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        } // делаем это один раз  и убираем событие
    }

    window.addEventListener('scroll', showModalByScroll);


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

    const getResource = async (url) => { // получаем данные для карты c сервера  , функция асинхронная
        const res = await fetch(url);
        if (!res.ok) { // в случае если get запрос не пройдёт
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }
        return await res.json(); // 
    };

    getResource('http://localhost:3000/menu') // данные по карточкам 
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

    // FORMS

    const forms = document.querySelectorAll('form'); //получаем все формы
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Скоро с вами свяжемся',
        failure: 'что то пошло не так...'
    };

    forms.forEach(form => bindPostData(form)); //запускаем функцию к каждой форме

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

            postData('http://localhost:3000/requests', json)
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
        openModal();

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
            closeModal();
        }, 4000);
    }


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

    //
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const slidesField = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(slidesWrapper).width;
    const sliders = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');

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



});