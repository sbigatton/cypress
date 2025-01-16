export class ProductPage {

    title = 'Back to products';
    productItemSelector = '[data-test="inventory-item"]';
    productNameSelector = '[data-test="inventory-item-name"]';
    productDescriptionSelector = '[data-test="inventory-item-desc"]';
    productPriceSelector = '[data-test="inventory-item-price"]';
    productImageSelector = 'img.inventory_details_img';
    addProductToCartButtonSelector = '[data-test="add-to-cart"]';
    removeProductButtonSelector = '[data-test="remove"]';
    
    getProductDescription(){
        return cy.get(this.productDescriptionSelector)
    };
    
    getProductPrice(){
        return cy.get(this.productPriceSelector)
    };
    
    getProductImage(){
        return cy.get(this.productImageSelector);
    }
    
    addProductToCart() {        
        cy.contains('Add to cart').click();
    }

    removeProduct() {
        cy.contains('Remove').click();
    }
}