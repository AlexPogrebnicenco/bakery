import products from "./products.js";
import { renderProductCards } from "./modules/productCards03.js";
import { handleOrderConfirmation } from "./modules/orderConfirmation.js";


window.addEventListener('DOMContentLoaded', () => {
    // Инициализация рендера карточек     
    const productContainer = document.querySelector('.js-products-list'); // Подключаем контейнер для карточек продуктов
    renderProductCards(products, productContainer); // Рендерим карточки продуктов

    // Инициализация обработки подтверждения заказа
    handleOrderConfirmation();


    // Создаем модальное окно для описания продукта
    const descriptionModal = document.createElement('div');
    descriptionModal.classList.add('product-description-modal');
    descriptionModal.innerHTML = `
                             
                                <div class="modal-overlay"></div>
                                <div class="modal-content">
                                    <!-- Контейнер с задним блоком для изображения -->
                                    <div class="image-wrapper">
                                    <img src="" alt="" class="product-image">
                                    </div>
                                    
                                    <!-- Текстовое содержание -->
                                    <div class="modal-text-content">
                                        <!-- Логотип -->
                                        <div class="modal-logo">
                                            <img src="../assets/images/modal-logo.png" alt="Vanilla Bloom Logo">
                                        </div>

                                        <!-- Заголовок -->
                                        <h2 class="modal-title"></h2>
                                        
                                        <!-- Описание -->
                                        <p class="product-description-text"></p>

                                        <!-- Кнопка закрытия с иконкой -->
                                        <div class="modal-close-btn">
                                            <img src="../assets/images/modal-arrow.png" alt="Arrow Icon" class="close-arrow">
                                            <span>Inchide</span>
                                            <div class="close-icon"></div>
                                        </div>
                                    </div>
                                </div>
                            
    `;
    document.body.appendChild(descriptionModal);


    // Находим кнопку закрытия после добавления модального окна в DOM
    const closeModalButtons = descriptionModal.querySelectorAll('.modal-close-btn');

    // Функция открытия модального окна с данными продукта
    const openModal = (product) => {
        // Устанавливаем данные продукта в модальное окно
        descriptionModal.querySelector('.product-image').src = product.image;
        descriptionModal.querySelector('.product-image').alt = product.title;
        descriptionModal.querySelector('.modal-title').innerText = product.title;
        descriptionModal.querySelector('.product-description-text').innerText = product.description;
        
        // Отображаем модальное окно
        descriptionModal.classList.add('active'); 
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        console.log("Закрытие модального окна вызвано");
        descriptionModal.classList.remove('active');
    };

    // Добавляем обработчик события закрытия для всех кнопок закрытия
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
        button.addEventListener('touchend', (event) => {
            event.preventDefault(); // Отменяем действие по умолчанию
            closeModal();
        });
    });
    

    // Закрываем модальное окно при клике вне области модального окна ... либо убрать вовсе либо сделать так чтобы при клике вне на большей площади срабатывало
    const modalOverlay = descriptionModal.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', closeModal);
    modalOverlay.addEventListener('touchend', (event) => {
        event.preventDefault(); // Отменяем действие по умолчанию
        closeModal();
    });

    // Обработчик события для клика по карточке товара 
    productContainer.addEventListener('click', (event) => {
        //Проверяем был ли клик по элементу с класом .product-card-unique
        const card = event.target.closest('.product-card-unique');
        if (card && event.target.classList.contains('product-image')) {
            // Получаем ID продукта из атрибута data-id карточки
            const productID = card.getAttribute('data-id');
            // Находим объект продукта в массиве по его ID
            const product = products.find(item => item.id === productID);

            if (product) {
                openModal(product); // Открываем модальное окно с данными продукта
            }
        }
    });



});  // Функция будет вызвана после загрузки html документа и его обработки браузером