import {closeModal, openModal} from './modals';
import {postData} from '../services/services';

function forms (formSelector, modalTimerId) {
    //Реализация скрипта отправки данных на сервер
    //Задача : взять несколько форм , которые есть на сайте и отправить их на server.php 
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжеся',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img'); //Тег img для спиннера
            statusMessage.src = message.loading; //Подставляем в тег img атрибут src который мы получили из объекта message
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            
            form.insertAdjacentElement('afterend', statusMessage);

            // Как сделать так , чтобы все данные, которые заполнил пользователь в форме, мы получили в JS и уже могли отправить на сервер? Два формата: 1) FormData (убираем const object, убираем headers, в body пишем formData, в server.php комментим доп строку) 2) сейчас JSON 

            const formData = new FormData(form); //Собираем все данные из нашей формы

            const json = JSON.stringify(Object.fromEntries(formData.entries())); //Берем formData, ее сначала превращаем в массив массивов (entries), потом превращаем в классический объект (Object.fromEntries), а после этого - в объект json

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);  //data - те данные, которые вернул сервер
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

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
            closeModal('.modal'); //Закрываем мод окно, чтобы пользователю не мешать 
        }, 4000);
    }
}

export default forms;