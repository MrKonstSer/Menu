function calc () {
    // Calc

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', '1.375');
    }

    // Ф-я, перебираем в ней элементы (пол или активность), если класс у элемента совпадает со значением атрибута у localStorage, то присваиваем этому элементу активный класс (зеленый)
    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_______';
            return;  //return use чтобы прервать и не выполнять дальше программу
        }

        if(sex === 'female') {
            result.textContent = Math.round((447.6 +(9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); //Получим все элементы 

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {  //Если такой атрибут есть у объекта события(кнопки активности, на к. нажали)
                    ratio = +e.target.getAttribute('data-ratio'); //То мы в переменную ratio записываем значение атрибута data-ratio. Вытаскиваем значение гетАттрибутом
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); //Записываем в localStorage ключ и значение
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id')); //Записываем в localStorage ключ и значение
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => { 

            if(input.value.match(/\D/g)) {  //Если мы нашли какое то НЕ число в нашем value
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) { //Получаем id
                case 'height':                 // Если это рост
                    height = +input.value;     // Тогда рост = значению в кнопке
                    break;                     // Выход и так далее
                case 'weight':                 
                    weight = +input.value;     
                    break;
                case 'age':                 
                    age = +input.value;     
                    break;                              
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;