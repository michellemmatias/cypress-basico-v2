// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />
///Seção 2 Curso Cypress Básico - Exercicios
/// Exercicio 1

describe('Central de Atendimento ao Cliente TAT', function() {/// describle define a súite de testes
    beforeEach(function(){ /// beforeEach serve para aproveitar o código função que antes de qualquer teste fará esse passo
        cy.visit('./src/index.html') /// visit acessa a página nesse caso localmente
       

    })
    //ct_01
    it('verifica o título da aplicação', function() { /// it define o caso de testes
       
         cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')// verifica se o title é igual should.be.equal 
    })

    //ct_2 Digitando campos no elemento
    it('preenche os campos obrigatórios e envia o formulário', function(){ ///.only significa que vai rodar somente esse cenário de testes
       //const é para criar uma variavel
        const longText = 'Testando cypress, vou aprender, vou conquistar o mundo, vou ser mestre em automação, vou conseguir, aperfeiçoar e vencer'
       cy.get('#firstName').type('Michelle')
       cy.get('#lastName').type('Matias')
       cy.get('#email').type('mimissonmatias@gmail.com')
       cy.get('#open-text-area').type(longText, {delay: 0})// usar o delay qdo o texto for muito grande para que não interfira no tempo de execução
     //cy.get('button[type="submit"]').click()
       cy.contains('button[type="submit"]', 'Enviar').click()
       cy.get ('.success').should('be.visible')

  
    })
    //ct_3 Exercicio Extra 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Michelle')
        cy.get('#lastName').type('Matias')
        cy.get('#email').type('mimissonmatiasgmail.com')
        cy.get('#open-text-area').type('Teste')
     // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get ('.error').should('be.visible')


    })
    ///ct_4 Exericio Extra 3
    it('campo telefone continua vazio após input não numerico', function(){
        cy.get('#phone')
        .type('abc')
        .should('have.value', '')

    })
    
    ///ct_5 Exericio Extra 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Michelle')
        cy.get('#lastName').type('Matias')
        cy.get('#email').type('mimissonmatias@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
     // cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get ('.error').should('be.visible')
        

    })
    ///ct_6 Exericio Extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Michelle')
          .should ('have.value','Michelle')
          .clear()
          .should('have.value', '')

          cy.get('#lastName').type('Matias')
          .should ('have.value','Matias')
          .clear()
          .should('have.value', '')

          cy.get('#email').type('mimissonmatias@gmail.com')
          .should ('have.value','mimissonmatias@gmail.com')
          .clear()
          .should('have.value', '')

          cy.get('#phone').type('11998905823')
          .should ('have.value','11998905823')
          .clear()
          .should('have.value', '')
    } )
    ///ct_7 Exercicio Extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button', 'Enviar').click()
        //cy.get('button[type="submit"]').click()
        cy.get ('.error').should('be.visible')

    })
    //ct_8 Exercicio Extra 7 
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get ('.success').should('be.visible')
    })
   //ct09_Exercicio aula Seção 4
   it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select').select('YouTube')// usei a classe select mas poderia usar o css do campo #product
        .should('have.value', 'youtube')

   })
   //ct10_Exercicio extra 1 aula Seção 4
   it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('select').select('mentoria')
    .should('have.value', 'mentoria')

    })
    //ct11_Exercicio extra 2 aula Seção 4
   it('eleciona um produto (Blog) por seu índice', function(){
    cy.get('select').select(1)
    .should('have.value', 'blog')

    })

    //ct12
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value= "feedback"]').check()
        .should('have.value', 'feedback')
        
      
    })
    it('marca cada tipo de atendimento',function(){
        cy.get('input[type="radio"]')/// encontrou o elemento
          .should('have.length',3)/// validou a quantidade encontrada no radio
          .each(function($radio){/// encadear os elementos função que localiza todos os elemntos radio
            cy.wrap($radio).check()// wrap varre o radio fazendo o check em cada radio
            cy.wrap($radio).should('be.checked')// valida se o ocorreu o check

    })
})

    it('marca ambos checkboxes, depois desmarca o último',function(){
            cy.get('input[type="checkbox"]')
              .check()
              .should('be.checked')
              .last()
              .uncheck()
              .should('not.be.checked')

        })
    
//ct11_Exercicio 1 aula Seção 7
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')//localizou o elemento
        .should('not.have.value')//verificou se dentro dele não tinha valor
        .selectFile('./cypress/fixtures/example.json')//usou o selectFile e informou o caminho/nome do arquivo
        .should(function($input){// verificação pode receber uma função que verifica através de 
            expect($input[0].files[0].name).to.equal('example.json')// um array (posicional) se o arquivo foi anexado

        })
    })
//ct11_Exercicio 2 aula Seção 7
it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json',{action: "drag-drop"})//informei o caminho mais o tipo de ação, no caso drag-drop (arrastar o arquivo)
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    
        })
    })
//ct11_Exercicio extra aula Seção 7
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
        cy.fixture('example.json').as('sampleFile')//pegar o arquivo e .as dá um outro nome
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')//precisa de @ para refernciar o nome
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })
//Exercicio 1 aula Seção 8   
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')///localizou o elemento a (link) e verificou se existia o atributo _blank(que abre link em outra página)
    })
//Exercicio extra 1 aula Seção 8   
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
      
    }) 
 
})