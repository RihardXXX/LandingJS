function tabs() {
    // Tabs Content

    const tabsContent = document.querySelectorAll('.tabcontent'); // контент табов
    const tabs = document.querySelectorAll('.tabheader__item'); // список
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

}

module.exports = tabs;