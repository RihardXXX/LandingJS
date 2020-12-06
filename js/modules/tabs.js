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

export default tabs;