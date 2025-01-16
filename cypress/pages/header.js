export class Header {
    
    title = 'Swag Labs';
    menuSelector = 'button#react-burger-menu-btn';
    cartButtonSelector = '[data-test="shopping-cart-link"]';
    pageTitleSelector = '[data-test="title"]';
    activeFilterOptionSelector = '[data-test="active-option"]';
    selectFilterSelector = '[data-test="product-sort-container"]';
    backToProductSelector = '#back-to-products';
    cartButtonCounterSelector = '[data-test="shopping-cart-badge"]';

    selectFilterOption(option){
        cy.get(this.selectFilterSelector).select(option);
    }

    goToCart(){
        cy.get(this.cartButtonSelector).click();
    }

    goBackToProducts(){
        cy.get(this.backToProductSelector).click();
    }

    openMenu(){
        cy.get(this.menuSelector).click();
    }

    logout(){
        cy.get('[data-test="logout-sidebar-link"]').click();
    }

    getFilterOptions(){
        return cy.get(this.selectFilter).find('option');
    }
}