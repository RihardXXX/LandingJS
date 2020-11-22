document.addEventListener('DOMContentLoaded', () => {


    // Tabs Content

    const tabs = document.querySelectorAll('.tabheader__item'); // один таб
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
    const modalClose = modalWindow.querySelector('[data-close]');

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

    modalClose.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (event) => {
        if(event.target == modalWindow){
            closeModal();
        }// если сзади окна нажи мышкой закрываем
    });

    document.addEventListener('keydown', (event) => {
        if(event.code == 'Escape' && modalWindow.classList.contains('show')){
            closeModal();
        } // если клаву escape нажали закрываем
    });

    const modalTimerId = setTimeout(openModal, 8000);// через 5 секунд запускать модальное окно

    function showModalByScroll(){// показываем окно когда скролим вниз до конца
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){// если прокрученно до конца
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }// делаем это один раз  и убираем событие
    }

    window.addEventListener('scroll', showModalByScroll);


});
