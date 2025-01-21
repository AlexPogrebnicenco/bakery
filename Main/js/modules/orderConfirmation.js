const handleOrderConfirmation = () => {
    const confirmationButton = document.querySelector('.confirmation-button');

    confirmationButton.addEventListener('click', () => {
        // Собираем данные из корзины 
        const cartItems = document.querySelectorAll('.cart-item');
        const orderItems = [];
        cartItems.forEach(item => {
            const productId = item.getAttribute('data-id');
            const title = item.querySelector('.item-title').innerText;
            const quantity = parseInt(item.querySelector('.item-quantity').innerText, 10);
            const price = parseFloat(item.querySelector('.item-price').innerText.replace(',', '.'));

            orderItems.push({
                id: productId,
                title: title,
                quantity: quantity,
                price: price,
            });
        });


        // Общая сумма заказа 
        const totalAmount = parseFloat(document.querySelector('.total-amount').innerText.replace(',', '.'));

        // Получаем текущие дату и время в часовом поясе Молдовы
        const moldovaTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Chisinau" });
        const orderDate = new Date(moldovaTime);
        // Создаем объект заказа 
        const orderData = {
            items: orderItems,
            total: totalAmount,
            date: orderDate.toLocaleDateString('en-GB'),
            time: orderDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };

        console.log('Весь ордер:', orderData)

        // Отправляем данные на сервер
        function sendOrder(orderData) {
            fetch('https://example.com/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Order successful', data);
                    alert('Заказ успешно отправлен!');
                })
                .catch(error => {
                    console.error('Error', error);
                    alert('Ошибка при отправке заказа')
                });
        }

        sendOrder(orderData);

    });
};



export {
    handleOrderConfirmation
};