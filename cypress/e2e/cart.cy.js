/// <reference types="Cypress" />
const { LoginPage } = require('../pages/login-page');
const { Header } = require('../pages/header');
const { ProductListPage } = require('../pages/product-list-page');
const { ProductPage } = require('../pages/product-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutStepOnePage } = require('../pages/checkout-step-one-page');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productA = products.find(product => product.name === 'Sauce Labs Bike Light');
const productB = products.find(product => product.name === 'Sauce Labs Bolt T-Shirt');  

describe('Cart page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);    
        productListPage.addProductToCart(productA.name);
        productListPage.addProductToCart(productB.name);
        cy.get(header.cartButtonCounterSelector).should('have.text', '2');
    });

    it('should display added products as cy.geted', () => {
        const header = new Header();
        header.goToCart();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);

        // Sauce Labs Bike Light
        cartPage.getProductDescription(productA.name).should('have.text', productA.description);
        cartPage.getProductPrice(productA.name).should('have.text', `$${productA.price}`);
        cartPage.getProductQuantity(productA.name).should('have.text', '1');
        cartPage.getProductButton(productA.name).should('have.text', 'Remove');
        
        // Sauce Labs Bolt T-Shirt
        cartPage.getProductDescription(productB.name).should('have.text', productB.description);
        cartPage.getProductPrice(productB.name).should('have.text', `$${productB.price}`);
        cartPage.getProductQuantity(productB.name).should('have.text', '1');
        cartPage.getProductButton(productB.name).should('have.text', 'Remove');
    });

    it('should remove products', () => {
        const header = new Header();
        header.goToCart();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);

        cartPage.removeProduct(productA.name);
        cy.get(cartPage.productNameSelector).contains(productA.name).should('not.exist');
        
        cartPage.getProductDescription(productB.name).should('have.text', productB.description);
        cartPage.getProductPrice(productB.name).should('have.text', `$${productB.price}`);
        cartPage.getProductQuantity(productB.name).should('have.text', '1');
        cartPage.getProductButton(productB.name).should('have.text', 'Remove');

        cy.get(header.cartButtonCounterSelector).should('have.text', '1');
    });

    it('should continue shopping', () => {
        const header = new Header();
        header.goToCart();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);

        cartPage.continueShopping();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);
    });

    it('should navigate to product', () => {
        const header = new Header();
        header.goToCart();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);

        cartPage.goToProduct(productA.name);
        const productPage = new ProductPage();
        cy.get(header.backToProductSelector).should('be.visible');
        cy.get(productPage.productNameSelector).should('have.text', productA.name);
        cy.get(productPage.removeProductButtonSelector).should('have.text', 'Remove');
    });

    it('should checkout', () => {
        const header = new Header();
        header.goToCart();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);
        
        cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage();
        cy.get(header.pageTitleSelector).should('have.text', checkoutStepOnePage.title);
    });
});