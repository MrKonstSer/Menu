window.addEventListener('DOMContentLoaded', () => {


    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //Timer

    const deadLine = '2022-04-01';

    //Функция определяющая разницу между нашим дедлайном и текущем временем
    
    function getTimeRemaning(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60 ) % 60),
              seconds = Math.floor((t / 1000) % 60);
              
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };      
    }

    //Функция , добавляющая 0 перед одиночными цифрами

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //Функция, устанавливающая наш таймер на страничку

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
           updateClock();   // Устраняем баг, с миганием таймера при перезагрузке странички
              
        //Функция, обновляющая наш таймер каждую секунду
        function updateClock() {
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //Модальное окно

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide'); 
        //modal.classList.toggle('show'); // show - селектор из CSS
        document.body.style.overflow = 'hidden'; //Запрещаем прокрутку сайта при открытом модальном окне
        clearInterval(modalTimerId); // Отменяем счетчик времени , если пользователь сам открыл модальное окно
    }      

    modalTrigger.forEach(item => {
        item.addEventListener('click', openModal);
    });

    

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        //modal.classList.toggle('show');
        document.body.style.overflow = ''; //Разрешаем прокрутку сайта
    }

    // Закрытие мод окна с подложки (темная сторона), с помощью получения атрибута data-close = " "  или с клавиши Escape
     
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {  // Чтобы посмотреть коды разных клавиш гуглим event code
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    // Открываем модОкно при прокрутке до самого низа

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);


    //Создаем новое меню на день с помощью класса

    class MenuOnDay {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        madeHTML () {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            this.parent.append(element);                            
                                   
        }
    }

    new MenuOnDay(
        "img/tabs/vegy.jpg",
        'vegy', 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        1000, 
        '.menu .container',
        'menu__item'
    ).madeHTML();
    
    new MenuOnDay(
        "img/tabs/elite.jpg",
        'elite', 
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        14, 
        '.menu .container',
        'menu__item'
    ).madeHTML();

    new MenuOnDay(
        "img/tabs/post.jpg",
        'post', 
        'Меню Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        21, 
        '.menu .container',
        'menu__item'
    ).madeHTML();


    //Реализация скрипта отправки данных на сервер

    //Задача : взять несколько форм , которые есть на сайте и отправить их на server.php 

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжеся',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img'); //Тег img для спиннера
            statusMessage.src = message.loading; //Подставляем в тег img атрибут src который мы получили из объекта message
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');

            // Как сделать так , чтобы все данные, которые заполнил пользователь в форме, мы получили в JS и уже могли отправить на сервер? Два формата: 1) FormData 2) JSON

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(object); //Уходит запрос с данными


            request.send(json);

            request.addEventListener('load', () => { //получаем ответ от сервера
                if(request.status === 200) {  //если все ОК
                    console.log(request.response); //то выводим в консоль результат
                    showThanksModal(message.success); //запускаем функцию с сообщением , что все успешно. У нас покажется модальное окно и через 4 секунды оно будет закрываться, вместе с текстом и возвращением того нормального контента, который там будет
                    form.reset(); // Чистка формы, чтобы все данные сбросились
                    statusMessage.remove(); //Удаляем спиннер
                    
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div> 
        `;

        //Получаем наше модальное окно и зааппендим наш блок с версткой
        
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {    //Удалим окно через 4сек
            thanksModal.remove();
            prevModalDialog.classList.add('show');  //Добавляем шоу, чтобы показыать нормальное мод окно
            prevModalDialog.classList.remove('hide'); // Удаляем класс хид, чтобы окно не скрывалось
            closeModal(); //Закрываем мод окно, чтобы пользователю не мешать 
        }, 4000);
    }

    //Fetch API вариант с GET запросом

    /* fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())  // Этот метод превратит данные в формате JSON в обычный JS объект. response.json() - это Promise, и если все успешно прошло и он за какое то время преобразовался в объект - идет следующий then
        .then(json => console.log(json)); // Здесь json - это объект JS  */


        //Fetch API вариант с POST запросом 
        
        fetch('https://jsonplaceholder.typicode.com/posts' , {
            method : "POST",
            body: JSON.stringify({name: "Alex"}),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())  
        .then(json => console.log(json));
         
        

});  
 


 


