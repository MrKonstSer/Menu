function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide'); 
    //modal.classList.toggle('show'); // show - селектор из CSS
    document.body.style.overflow = 'hidden'; //Запрещаем прокрутку сайта при открытом модальном окне
    
    console.log(modalTimerId);
    if(modalTimerId) {
        clearInterval(modalTimerId); // Отменяем счетчик времени , если пользователь сам открыл модальное окно
    }
}

function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = ''; //Разрешаем прокрутку сайта
}

function modals (triggerSelector, modalSelector, modalTimerId) {
    //Modals

    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
    
    modalTrigger.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    // Закрытие мод окна с подложки (темная сторона), с помощью получения атрибута data-close = " "  или с клавиши Escape
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modal.classList.contains('show')) {  // Чтобы посмотреть коды разных клавиш гуглим event code
            closeModal(modalSelector);
        }
    });

    // Открываем модОкно при прокрутке до самого низа

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modals;
export {closeModal};
export {openModal};