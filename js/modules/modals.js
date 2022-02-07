function modals () {
    //Modals

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
}

export default modals;