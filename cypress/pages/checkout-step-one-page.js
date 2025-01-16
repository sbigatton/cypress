const { ProductListPage } = require('./product-list-page');

export class CheckoutStepOnePage extends ProductListPage {
    
    title = 'Checkout: Your Information';
    firstNameSelector = '[data-test="firstName"]';
    lastNameSelector = '[data-test="lastName"]';
    zipCodeSelector = '[data-test="postalCode"]';
    errorContainerSelector = '.error-message-container';
    
    fillFirstName(firstName){
        cy.get(this.firstNameSelector).type(firstName);
    }

    fillLastName(lastName){
        cy.get(this.lastNameSelector).type(lastName);
    }

    fillZipCode(code){
        cy.get(this.zipCodeSelector).type(code);
    }

    continue(){
        cy.contains('Continue').click();
    }

    cancel(){
        cy.contains('Cancel').click();
    }
}