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

export default modals;
export {
    openModal
};
export {
    closeModal
};