/// <reference types="Cypress" />
const { LoginPage } = require('../pages/login-page');
const { Header } = require('../pages/header');
const { ProductListPage } = require('../pages/product-list-page');
const { CartPage } = require('../pages/cart-page');
const { CheckoutStepOnePage } = require('../pages/checkout-step-one-page');
const { CheckoutStepTwoPage } = require('../pages/checkout-step-two-page');
const { CheckoutCompletePage } = require('../pages/checkout-complete-page');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productA = products.find(product => product.name === 'Sauce Labs Bike Light');
const productB = products.find(product => product.name === 'Sauce Labs Bolt T-Shirt');  

describe('Checkout information page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);      
        productListPage.addProductToCart(productA.name);
        productListPage.addProductToCart(productB.name);
        header.goToCart();
        const cartPage = new CartPage();
        cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage();
        cy.get(header.pageTitleSelector).should('have.text', checkoutStepOnePage.title);
    });

    it('should display information field validation messages', () => {
        const checkoutStepOnePage = new CheckoutStepOnePage();
        checkoutStepOnePage.continue();
        cy.get(checkoutStepOnePage.errorContainerSelector).should('have.text', 'Error: First Name is required');
        checkoutStepOnePage.fillFirstName('Jason');
        checkoutStepOnePage.continue();
        cy.get(checkoutStepOnePage.errorContainerSelector).should('have.text', 'Error: Last Name is required');
        checkoutStepOnePage.fillLastName('Born');
        checkoutStepOnePage.continue();
        cy.get(checkoutStepOnePage.errorContainerSelector).should('have.text', 'Error: Postal Code is required');
    });

    it('should cancel and navigate back to cart page', () => {
        const checkoutStepOnePage = new CheckoutStepOnePage();
        checkoutStepOnePage.cancel();
        const header = new Header();
        const cartPage = new CartPage();
        cy.get(header.pageTitleSelector).should('have.text', cartPage.title);
        cartPage.getProductItem(productA.name).should('be.visible');
        cartPage.getProductItem(productB.name).should('be.visible');
    });

    it('should continue to finish checkout', () => {
        const checkoutStepOnePage = new CheckoutStepOnePage();
        checkoutStepOnePage.fillFirstName('Jason');
        checkoutStepOnePage.fillLastName('Born');
        checkoutStepOnePage.fillZipCode('19019');
        checkoutStepOnePage.continue();
        const checkoutStepTwoPage = new CheckoutStepTwoPage();
        const header = new Header();
        cy.get(header.pageTitleSelector).should('have.text', checkoutStepTwoPage.title);
    });
});

describe('Checkout overview page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);      
        productListPage.addProductToCart(productA.name);
        productListPage.addProductToCart(productB.name);
        header.goToCart();
        const cartPage = new CartPage();
        cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage();
        checkoutStepOnePage.fillFirstName('Jason');
        checkoutStepOnePage.fillLastName('Born');
        checkoutStepOnePage.fillZipCode('19019');
        checkoutStepOnePage.continue();
    });

    it('should cancel and navigate back to products page', () => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage();
        checkoutStepTwoPage.cancel();
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);      
        cy.get(header.cartButtonCounterSelector).should('have.text', '2');
        productListPage.getProductButton(productA.name).should('have.text', 'Remove');
        productListPage.getProductButton(productB.name).should('have.text', 'Remove');
    });

    it('should display product details as expected', () => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage();

        // Sauce Labs Bike Light
        checkoutStepTwoPage.getProductDescription(productA.name).should('have.text', productA.description);
        checkoutStepTwoPage.getProductPrice(productA.name).should('have.text', `$${productA.price}`);
        checkoutStepTwoPage.getProductQuantity(productA.name).should('have.text', '1');
        
        // Sauce Labs Bolt T-Shirt
        checkoutStepTwoPage.getProductDescription(productB.name).should('have.text', productB.description);
        checkoutStepTwoPage.getProductPrice(productB.name).should('have.text', `$${productB.price}`);
        checkoutStepTwoPage.getProductQuantity(productB.name).should('have.text', '1');
    });

    it('should complete the order', () => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage();
        checkoutStepTwoPage.finish();

        const header = new Header();
        const checkoutCompletePage = new CheckoutCompletePage();
        cy.get(header.pageTitleSelector).should('have.text', checkoutCompletePage.title);
        cy.get(checkoutCompletePage.thankYouMsgSelector).should('be.visible');
        cy.get(checkoutCompletePage.successImageSelector).should('be.visible');
        cy.get(checkoutCompletePage.orderMsgSelector).should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
});