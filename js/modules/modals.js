function modals() {
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
}

module.exports = modals;