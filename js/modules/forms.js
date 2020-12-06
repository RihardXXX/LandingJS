import {
    closeModal,
    openModal
} from './modals';

import {
    postData
} from '../services/services';

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
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);
    }

}

export default forms;