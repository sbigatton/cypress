const { ProductPage } = require('./product-page');

export class ProductListPage extends ProductPage {
    title = 'Products';
    productsImageSelector = 'img.inventory_item_img';   

    getProductItem(name){
        return cy.contains(name).parents(this.productItemSelector);        
    }

    getProductDescription(name){
         return this.getProductItem(name).find(this.productDescriptionSelector);
    }

    getProductPrice(name){
        return this.getProductItem(name).find(this.productPriceSelector);
    }

    getProductImage(name){
        return this.getProductItem(name).find(this.productsImageSelector);
    }

    getProductButton(name){
        return this.getProductItem(name).find('button');
    }

    addProductToCart(name) {
        this.getProductButton(name).contains('Add to cart').click();
    }

    removeProduct(name) {
        this.getProductButton(name).contains('Remove').click();
    }

    goToProduct(name) {
        this.getProductItem(name).find(this.productNameSelector).click();
    }
}