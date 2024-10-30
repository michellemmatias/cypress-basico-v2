Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Michelle')
    cy.get('#lastName').type('Matias')
    cy.get('#email').type('mimissonmatias@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
    //cy.get('button[type="submit"]').click()


})

