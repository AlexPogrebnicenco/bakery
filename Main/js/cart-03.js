// Часть таблицы tbody внутри корзины, в который мы добавляем товары 
const cartItems = document.querySelector('.cart-items');


//Отслеживаем клик на странице
window.addEventListener('click', function (event) {
    // Проверяем что клик был совершен по кнопке "Descriere"
    if (event.target.hasAttribute('data-cart')) {
        // Находим карточку товара внутри которой был совершен клик
        const card = event.target.closest('.product-card-unique');
        // Собираем данные с этого товара и записывает их в единный объект productInfo
        const productInfo = {
            id: card.dataset.id,
            title: card.querySelector('.product-title').innerText,
            price: card.dataset.price,
            counter: card.querySelector('[data-counter]').innerText,
        }
        // Провяем есть ли уже такой товар к корзине 
        const itemInCart = cartItems.querySelector(`[data-id="${productInfo.id}"]`);

        // Если товар есть в корзине
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
            calculateRowTotal(itemInCart);
            updateTotal();
        } else {

        // Собранные данные подставим в шаблон для товара в корзине
        const cartItemHTML = `
                             <tr class="cart-item" data-id="${productInfo.id}">
                                <td>
                                    <label>
                                        <input type="checkbox" id="select-all" class="real-all-checkbox">
                                        <span class="select-all-checkbox"></span>
                                    </label>
                                </td>
                                <td>1.</td>
                                <td class="item-title">${productInfo.title}</td>
                                <td class="quantity counter-wrapper">
                                    <button class="quantity-btn decrease" data-action="minus">-</button>
                                    <span class="item-quantity" data-counter>${productInfo.counter}</span>
                                    <button class="quantity-btn increase" data-action="plus">+</button>
                                </td>
                                <td class="item-price">${productInfo.price}</td>
                                <td class="item-total last-column"></td>
                            </tr>
        `;

        // Отобразим товар в корзине
        cartItems.insertAdjacentHTML('beforeend', cartItemHTML);

        // Находим только что добавленный элемент
        const newItem = cartItems.querySelector(`[data-id="${productInfo.id}"]`);

        // Рассчитываем сумму для нового товара
        calculateRowTotal(newItem);
        updateTotal();
        updateItemNumbers();
        
        }
        // Сбрасываем счетчик на 1
        card.querySelector('[data-counter]').innerText = '1';
    }
});


//////////////////////Удаление элементов из корзины /////////////////
// Выбираем все элементы связанные с корзиной
const deleteButton = document.querySelector('.delete'); // Можно потом переместить наверх
const selectAllCheckbox = document.querySelector('#select-all'); // Главный чекбокс select all

// Добавляем обработчик для главного чекбокса
selectAllCheckbox.addEventListener('change', () => {
    // Выбираем все чекбоксы внутри корзины
    const allCheckboxes = cartItems.querySelectorAll('.real-all-checkbox');
    allCheckboxes.forEach(checkbox => {
        // Устанавливаем состояние каждого чекбокса в соответствии с состояние главного чекбокса
        checkbox.checked = selectAllCheckbox.checked
    });
});

// Добавляем обработчик клика на кнопку "Удалить выбранные"
deleteButton.addEventListener('click', function () {
    //Находим все отмеченные чекбоксы 
    const selectedItems = cartItems.querySelectorAll('.cart-item input.real-all-checkbox:checked');

    // Проходим по каждому выбранному элементу 
    selectedItems.forEach((checkbox) => {
        // Находим родительский элемент строки, содержащий товар и удаляем этот товар их DOM 
        const cartItem = checkbox.closest('.cart-item').remove();
    })
    updateTotal();
    updateItemNumbers();
});


//////////// Функция для расчета суммы в каждой строке ////////
function calculateRowTotal(cartItem) {
    // Находим количество и цену товара 
    const quantity = parseInt(cartItem.querySelector('.item-quantity').innerText);
    const price = parseFloat(cartItem.querySelector('.item-price').innerText.replace(',','.'));

    // Рассчитываем общую сумму для этого товара 
    const rowTotal = quantity * price;

    // Обновляем значение в ячейке СУМА для этой строки 
    cartItem.querySelector('.item-total').innerText = rowTotal.toFixed(2).replace('.',',');
};

//////////// Функция для пересчета всех строк при загрузке или изменени
function updateAllRowTotals() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => calculateRowTotal(item));
};


////////////Функция для обновления общей суммы 
function updateTotal() {
    let total = 0;

    // Находим все строки товаров в корзине
    const items = document.querySelectorAll('.cart-item');

    // Проходим по каждой строке и суммируем значения "Сума"
    items.forEach(item => {
        const rowTotal = parseFloat(item.querySelector('.item-total').innerText.replace(',','.'));
        total += rowTotal
    });

    // Обновляем отображение общей суммы в футере таблицы
    document.querySelector('.total-amount').innerText = total.toFixed(2).replace('.',',');

    // Обновляем отображение общей суммы в основном блоке
    document.querySelector('.total-amount-display').innerText = `${total.toFixed(2).replace('.',',')} Lei`;

};


//////////Функция для изменения обновления порядкового номер
function updateItemNumbers() {
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach((item, index) => {
        // Устанавливаем номер позиции начиная с 1
        item.querySelector('td:nth-child(2)').innerText = index +1;
    });
};
