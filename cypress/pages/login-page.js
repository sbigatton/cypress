export class LoginPage {
    
    userNameSelector = '[data-test="username"]';
    passwordSelector = '[data-test="password"]';
    loginButtonSelector = '[data-test="login-button"]';
    errorContainerSelector = '[data-test="error"]';

    login(userName, password) {
        this.fillUserName(userName);
        this.fillPassword(password);
        this.clickOnLoginButton();
    }

    fillUserName(userName){
        cy.get(this.userNameSelector).type(userName);
    }

    fillPassword(password){
        cy.get(this.passwordSelector).type(password);
    }

    clickOnLoginButton(){
        cy.get(this.loginButtonSelector).click();
    }   
}