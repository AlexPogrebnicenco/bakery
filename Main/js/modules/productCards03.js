const renderProductCard = (product) => {
    const li = document.createElement('li');
    li.classList.add('product-card');
    

    li.innerHTML = `
                        <div class="product-card-unique" data-id="${product.id}" data-price="${product.price}">
                                    <img src="${product.image}" alt="${product.title}" class="product-image">
                                    <p class="product-title">${product.title}</p>
                                    <div class="product-controls counter-wrapper">
                                        <button class="quantity-button" data-action="minus">-</button>
                                        <div class="quantity-current" data-counter>1</div>
                                        <button class="quantity-button" data-action="plus">+</button>
                                        <button class="description-button" data-cart>ÎN COȘ</button>
                                    </div>
                        </div>               
                    `;
    return li;
};

const appendProductCard = (product, container) => {
    container.append(product);
};


const renderProductCards = (products, container) => {
    //   console.log(1);
    // console.log(products);

    products.forEach((product, index) => {

        if (index === 0) {
            const categoryTitle = document.createElement('p');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent= 'ECLERE';
            container.append(categoryTitle);
        }

        const card = renderProductCard(product);
        // console.log('card:', card);
        appendProductCard(card, container);

        // Добавляем следующий раздел
        if (index === 3) {
            const categoryTitle = document.createElement('p');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent= 'MOUSSE';
            container.append(categoryTitle);
        }
        if (index === 7) {
            const categoryTitle = document.createElement('p');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent= 'DESERTE CLASICE';
            container.append(categoryTitle);
        }
        if (index === 11) {
            const categoryTitle = document.createElement('p');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent= 'DESERT LA PAHAR';
            container.append(categoryTitle);
        }
        if (index === 15) {
            const categoryTitle = document.createElement('p');
            categoryTitle.classList.add('category-title');
            categoryTitle.textContent= 'MACARONS';
            container.append(categoryTitle);
        }
    });

};


export {
    renderProductCards
};



// This function renders Product Cards 