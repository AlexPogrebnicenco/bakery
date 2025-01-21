//Добавляю прослушку на всем окне
window.addEventListener('click', function (event) {

    // Объявляем переменную для счетчика
    let counter;

    // Проверяем клик строго по кнопкам Плюс или Минус
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обертку счетчика
        const productControls = event.target.closest('.counter-wrapper');
        // Находим див с числом счетчика
        counter = productControls.querySelector('[data-counter]');
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой плюс
    if (event.target.dataset.action === 'plus') {
        // Изменяем текст в счетчике уменьшая его на 1
        counter.innerText = ++counter.innerText;
        //После изменения количества вызываем функцию для пересчета суммы строки
        const cartItem = event.target.closest('.cart-item');
        if (cartItem) {
            calculateRowTotal(cartItem);
            updateTotal();
        }
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой минус
    if (event.target.dataset.action === 'minus') {
        // Проверяем чтобы счетчик был больше 1
        if (parseInt(counter.innerText) > 1) {
            // Изменяем текст в счетчике уменьшая его на 1
            counter.innerText = --counter.innerText;
            //После изменения количества вызываем функцию для пересчета суммы строки
            const cartItem = event.target.closest('.cart-item');
            if (cartItem) {
                calculateRowTotal(cartItem);
                updateTotal();
            }
        }
    }
});