export class CheckoutCompletePage {
    
    title = 'Checkout: Complete!';
    successImageSelector = '.pony_express';
    thankYouMsgSelector = '.complete-header';
    orderMsgSelector = '.complete-text';
    
    backHome() {
        cy.contains('Back Home').click();    
    }
}