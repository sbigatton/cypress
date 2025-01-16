/// <reference types="Cypress" />
const { LoginPage } = require('../pages/login-page');
const { Header} = require ('../pages/header');
const { ProductListPage } = require('../pages/product-list-page');
const { ProductPage } = require('../pages/product-page');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productNames = products.map(product => product.name);

describe('Product list page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);
        cy.get(header.cartButtonSelector).should('be.visible');    
    });

    it('should display expected list of products', () => {
        const productListPage = new ProductListPage();
        productNames.forEach(name => {
            cy.get(productListPage.productNameSelector).contains(name).should('be.visible');
        });
    });

    it('should display Sauce Labs Bike Light product details as expected', () => {
        const product = products.find(product => product.name === 'Sauce Labs Bike Light');
        const productListPage = new ProductListPage();  
        productListPage.getProductDescription(product.name).should('have.text', product.description);
        productListPage.getProductPrice(product.name).should('have.text', `$${product.price}`);
        productListPage.getProductImage(product.name).should('have.attr', 'src', product.image);
        productListPage.getProductButton(product.name).should('have.text', 'Add to cart');
    });

    it('should add / remove items to cart and display correct count', () => {        
        const header = new Header();
        const productListPage = new ProductListPage();
        productListPage.addProductToCart(productNames[1]);
        cy.get(header.cartButtonCounterSelector).should('have.text', '1');
        productListPage.getProductButton(productNames[1]).should('have.text', 'Remove');
        productListPage.addProductToCart(productNames[2]);
        cy.get(header.cartButtonCounterSelector).should('have.text', '2');
        productListPage.getProductButton(productNames[2]).should('have.text', 'Remove');
        productListPage.removeProduct(productNames[1]);
        cy.get(header.cartButtonCounterSelector).should('have.text', '1');
        productListPage.getProductButton(productNames[1]).should('have.text', 'Add to cart');
    });

    it('should navigate to product detail and go back', () => {
        const header = new Header();
        const productListPage = new ProductListPage();
        const productPage = new ProductPage();
        productListPage.goToProduct(productNames[1]);
        cy.get(header.backToProductSelector).should('have.text', productPage.title);
        cy.get(productPage.productNameSelector).should('have.text', productNames[1]);
        header.goBackToProducts();
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);
    });

    it('should sort products properly', () => {
        const header = new Header();
        const productListPage = new ProductListPage();
        
        cy.get(header.activeFilterOptionSelector).should('have.text', 'Name (A to Z)');
        const productNamesAtoZ = productNames.sort();        
        for (let index = 0; index < productNamesAtoZ.length; index++) {
            const name = productNamesAtoZ[index];
            cy.get(productListPage.productNameSelector).eq(index).should('have.text', name);    
        }
        
        header.selectFilterOption('Name (Z to A)');
        const productNamesZtoA = productNames.sort((a, b) => b.localeCompare(a));
        for (let index = 0; index < productNamesZtoA.length; index++) {
            const name = productNamesZtoA[index];
            cy.get(productListPage.productNameSelector).eq(index).should('have.text', name);    
        }

        header.selectFilterOption('Price (low to high)');
        const lowToHigh = products.sort((a, b) => a.price - b.price);
        const lowToHighProductNames = lowToHigh.map(product => product.name);
        for (let index = 0; index < lowToHighProductNames.length; index++) {
            const name = lowToHighProductNames[index];
            cy.get(productListPage.productNameSelector).eq(index).should('have.text', name);    
        }

        header.selectFilterOption('Price (high to low)');
        const highToLow = products.sort((a, b) => b.price - a.price);
        const highToLowProductNames = highToLow.map(product => product.name);
        for (let index = 0; index < highToLowProductNames.length; index++) {
            const name = highToLowProductNames[index];
            cy.get(productListPage.productNameSelector).eq(index).should('have.text', name);    
        }
    });
});