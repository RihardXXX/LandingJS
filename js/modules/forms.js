// const {
//     module
// } = require("../../webpack.config");

function forms() {
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

}

module.exports = forms;