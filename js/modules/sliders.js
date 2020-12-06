function sliders({
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
}) {

    //
    const sliders = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const next = document.querySelector(nextArrow);
    const prev = document.querySelector(prevArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slidesField = document.querySelector(field);

    let offset = 0;
    let slideIndex = 1;

    if (sliders.length < 10) {
        total.textContent = `0${sliders.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = sliders.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * sliders.length + '%'; // общая ширина обёртки
    slidesField.style.display = 'flex'; // чтобы стали по горизонтали
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; //скрываем элементы которые не попадают в область видимости

    sliders.forEach(slide => { // каждому слайду ширину обёртки
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function goSlide() {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });

        dots[slideIndex - 1].style.opacity = 1;
    }

    next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == sliders.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        goSlide();

    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (sliders.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }
        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }

        if (sliders.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        goSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translate(-${offset}px)`;

            if (sliders.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            goSlide();
        });
    });

    // Slider простой вариант слайда

    // const sliders = document.querySelectorAll('.offer__slide');
    // const current = document.querySelector('#current');
    // const total = document.querySelector('#total');

    // function hideSlide() { // удаляем слайды
    //     sliders.forEach(slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     });
    // }

    // function showSlide(i = 0) { // показываем слайды
    //     sliders[i].classList.add('show', 'fade');
    //     sliders[i].classList.remove('hide');
    //     current.textContent = getZero(i + 1);
    //     total.textContent = getZero(sliders.length);
    // }

    // function hideShow(i) { // удаляем и показываем слайды по индексу
    //     hideSlide();
    //     showSlide(i);
    // }

    // function choiceSlide() { // выбираем индексы и запускаем показ слайдов
    //     const next = document.querySelector('.offer__slider-next');
    //     const prev = document.querySelector('.offer__slider-prev');
    //     let i = 0;
    //     next.addEventListener('click', () => {
    //         i++;
    //         if (i == sliders.length) {
    //             i = 0;
    //         }
    //         hideShow(i);
    //     });

    //     prev.addEventListener('click', () => { //
    //         i--;
    //         if (i < 0) {
    //             i = 3;
    //         }
    //         hideShow(i);
    //     });
    // }

    // hideSlide(); // первый старт удаление слайдов
    // showSlide(); // показ слайдов
    // choiceSlide(); // выбор индекса слайда
    //======================================
}

export default sliders;