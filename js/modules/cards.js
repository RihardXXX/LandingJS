function cards() {
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
}

module.exports = cards;