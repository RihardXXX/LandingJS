
document.addEventListener('DOMContentLoaded', () => {


    // Tabs Content

    const tabs = document.querySelectorAll('.tabheader__item'); // список
    const tabsContent = document.querySelectorAll('.tabcontent'); // контент табов
    const tabsParent = document.querySelector('.tabheader__items'); // общее меню


    function hideTabcontent(){ // стираем весь контент 
        tabsContent.forEach(content => {
            content.classList.add('hide');// добавляеам класс и прячем контент
            content.classList.remove('show', 'fade'); // класс показа плавно убираем
        });
        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });// снимаем выделение с меню
    }
    

    function showTabContent(i=0){// показ контента и выделение меню
        tabsContent[i].classList.add('show', 'fade'); // плавно добавляем показ
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }   // и в меню добавляем выделение

    function choiceTab(){ // на какой пункт меню щелкнули
        tabsParent.addEventListener('click', (event) => {
            const target = event.target; // див с щелчком

            if(target && target.classList.contains('tabheader__item')){
                tabs.forEach((tab, i) => {
                    if(tab == target){// сравнение со списком дивов
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

    function getTimeRemaining(endTime){ 
        const t = Date.parse(endTime) - Date.parse(new Date()); // осталось времени в милисекундах
        const days = Math.floor(t / (1000 * 60 * 60 * 24));// милисекунды разницы делим на милисекунды в день
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);// милисекунды разницы  делим на милисекунды час и ост от деления 24 часа
        const minutes = Math.floor((t / 1000 / 60) % 60);// милисекунды разницы делим секунды делим минуты и остаток от часа 
        const seconds = Math.floor((t / 1000) % 60);// милисекунды разница делим на секунды остаток от минуты

        return{
            'total': t, // эта штука нужна чтобы остановить таймер, когда закончится разница
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
            
        };
    }

    function getZero(number){
        if(number >= 0 && number < 10){
            return `0${number}`;
        }else{
            return number;
        }
    }

    function setClock(selector, endTime){
        const timer = document.querySelector(selector); // цепляемся за все элементы
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        
        const timeInterval = setInterval(updateClock, 1000); // c интервалом 1 секунду узнаем разницу и заполняем селекторы

        updateClock(); // чтобы задержки не было первый запуск в ручную

        function updateClock(){
            const t = getTimeRemaining(endTime); // объект с данными
            days.textContent = getZero(t.days); // заполняем все селекторы
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            
            if(t.total <= 0){ // если уже нет разницы то отключаем таймер
                clearInterval(timeInterval);
            }
        }

    }
    
    setClock('.timer', deadLine);



    // Modal window

    const buttonsClick = document.querySelectorAll('[data-modal]');
    const modalWindow = document.querySelector('.modal');


    function openModal(){// функция открытия окна
        modalWindow.classList.add('show');// класс показа окна
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden'; // при открытом окне задний фон не прокручивается
        clearInterval(modalTimerId); // Если пользователь сам открыл окно, то не вызвывать его
    }

    function closeModal(){ // функция закрытия окна
        modalWindow.classList.remove('show');// класс показа окна удаляем
        modalWindow.classList.add('hide');
        document.body.style.overflow = ''; //чтобы скрол страницы опять заработал
    }

    buttonsClick.forEach(button => { // при нажатии на кнопку открываем окно
        button.addEventListener('click', openModal);
    });

    modalWindow.addEventListener('click', (event) => {
        if(event.target == modalWindow || event.target.getAttribute('data-close') == ''){
            closeModal();
        }// если сзади окна нажи мышкой закрываем или на крестик
    });

    document.addEventListener('keydown', (event) => {
        if(event.code == 'Escape' && modalWindow.classList.contains('show')){
            closeModal();
        } // если клаву escape нажали закрываем
    });

    const modalTimerId = setTimeout(openModal, 50000);// через 5 секунд запускать модальное окно

    function showModalByScroll(){// показываем окно когда скролим вниз до конца
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){// если прокрученно до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }// делаем это один раз  и убираем событие
    }

    window.addEventListener('scroll', showModalByScroll);


    // Используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 80;
            this.changeToRUB();// конвертируем в рубли
        }

        changeToRUB(){ // конвертер курса
            this.price = +this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if(this.classes.length == 0){ // если вдруг класс забыли написать
                this.classes.push('menu__item');
            }
            this.classes.forEach(className => element.classList.add(className));
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

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        10,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        17,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        22,
        '.menu .container',
        'menu__item'
    ).render();

    
    
    // FORMS

    const forms = document.querySelectorAll('form'); //получаем все формы
    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Скоро с вами свяжемся',
        failure: 'что то пошло не так...'
    };

    forms.forEach(form => postData(form));//запускаем функцию к каждой форме

    function postData(form){//
        form.addEventListener('submit', (event) => {
            event.preventDefault();//отключаем перезагрузку
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: auto;
            `;
            // добавляем в форму спиннер
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type','application/json');
            const formData = new FormData(form);
            
            const obj = {}; // создаём объект для json отправки 
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            const json = JSON.stringify(obj);// обычн объект в JSON объект

            request.send(json); // отправляем json объект 

            request.addEventListener('load', () => {
                if(request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.succes);
                    
                    form.reset(); // очистка полей формы после удачной загрузки
                    statusMessage.remove();
                }else{
                    showThanksModal(message.failure);
                }

            });
        });
    }


    function showThanksModal(message){ //функция показа благодарсности 
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

    //Fetch API
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json));

});
