const { CartPage } = require('./cart-page');

export class CheckoutStepTwoPage extends CartPage {
    
    title = 'Checkout: Overview';
        
    cancel() {
        cy.contains('Cancel').click();
    }

    finish() {
        cy.contains('Finish').click();
    }
}