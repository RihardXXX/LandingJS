function timer() {
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

}

module.exports = timer;