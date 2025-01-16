const { ProductListPage } = require('./product-list-page');

export class CartPage extends ProductListPage {

    title = 'Your Cart';
    quantitySelector = '[data-test="item-quantity"]';

    getProductQuantity(name) {
        return super.getProductItem(name).find(this.quantitySelector);
    }

    checkout() {
        cy.contains('Checkout').click();
    }

    continueShopping() {
        cy.contains('Continue Shopping').click();
    }
}