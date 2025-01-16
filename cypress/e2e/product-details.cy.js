/// <reference types="Cypress" />
const { LoginPage } = require('../pages/login-page');
const { Header} = require ('../pages/header');
const { ProductListPage } = require('../pages/product-list-page');
const { ProductPage } = require('../pages/product-page');
const products = require('../data/products.json');
const account = require('../data/account.json');

const product = products.find(product => product.name === 'Sauce Labs Bike Light');

describe('Product details page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);
        cy.get(header.cartButtonSelector).should('be.visible');    
        const productPage = new ProductPage();          
        productListPage.goToProduct(product.name);
        cy.get(productPage.productNameSelector).should('have.text', product.name);
    });

    it('should display Sauce Labs Bike Light product details as expected', () => {
        const productPage = new ProductPage();
        cy.get(productPage.productNameSelector).should('have.text', product.name);
        cy.get(productPage.productDescriptionSelector).should('have.text', product.description);
        cy.get(productPage.productPriceSelector).should('have.text', `$${product.price}`);
        cy.get(productPage.productImageSelector).should('have.attr', 'src', product.image);
        cy.get(productPage.addProductToCartButtonSelector).should('be.visible');
    });

    it('should add / remove product to cart and display correct count', () => {        
        const header = new Header();
        const productPage = new ProductPage();
        productPage.addProductToCart();
        cy.get(header.cartButtonCounterSelector).should('have.text','1');
        productPage.removeProduct();
        cy.get(header.cartButtonCounterSelector).should('not.exist');
        cy.get(productPage.addProductToCartButtonSelector).should('be.visible');
    });
});