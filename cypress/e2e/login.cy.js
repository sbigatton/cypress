/// <reference types="Cypress" />
const { LoginPage } = require('../pages/login-page');
const { Header} = require ('../pages/header');
const { ProductListPage } = require('../pages/product-list-page');
const account = require('../data/account.json');

describe('Login page', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('should redirect the user to products page', () => {
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        const productListPage = new ProductListPage();    
        cy.get(header.pageTitleSelector).should('have.text', productListPage.title);
        cy.get(header.cartButtonSelector).should('be.visible');        
    });

    it('should display invalid credentials error', () => {
        const loginPage = new LoginPage();
        loginPage.clickOnLoginButton();
        cy.get(loginPage.errorContainerSelector).should('have.text','Epic sadface: Username is required');
        loginPage.fillUserName(account.username);
        loginPage.clickOnLoginButton();
        cy.get(loginPage.errorContainerSelector).should('have.text','Epic sadface: Password is required');
        loginPage.fillPassword('invalidPassword');
        loginPage.clickOnLoginButton();
        cy.get(loginPage.errorContainerSelector).should('have.text','Epic sadface: Username and password do not match any user in this service');
    });

    it('should display an error navigating with user not logged in', () => {
        cy.visit('https://www.saucedemo.com/inventory.html', { failOnStatusCode: false });        
        const loginPage = new LoginPage();        
        cy.get(loginPage.errorContainerSelector).should('have.text','Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
    });

    it('should redirect to login page on logout', () => {
        const loginPage = new LoginPage();
        loginPage.login(account.username, account.password);
        const header = new Header();
        header.openMenu();
        header.logout();
        cy.get(loginPage.loginButtonSelector).should('be.visible');
    });
});