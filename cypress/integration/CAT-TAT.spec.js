/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preencher os campos obrigatorios e enviar o formulario', function() {
       const longText = 'Teste, Teste, teste Teste, Teste, teste Teste, Teste, teste Teste, Teste, teste Teste, Teste, teste Teste, Teste, teste Teste, Teste, testeTeste, Teste, testeTeste, Teste, testeTeste, Teste, teste'
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone').type('84981458525')
        cy.get('#open-text-area').type(longText, {delay : 0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('teste@gmail,com')
        cy.get('#phone').type('84981458525')
        cy.get('#open-text-area').type('TESTE')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido por valor não-numerico', function(){
        cy.get('#phone').type('abcdefghij')
        .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Italo')
        cy.get('#lastName').type('Martins')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('TESTE')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Preencher e limpar os campos nome, sobrenome, email e telefone',function(){
        cy.get('#firstName')
          .type('Italo')
          .should('have.value','Italo')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Martins')
          .should('have.value','Martins')
          .clear()
          .should('have.value', '') 
        cy.get('#email')
          .type('teste@gmail.com')
          .should('have.value','teste@gmail.com')
          .clear()
          .should('have.value', '') 
        cy.get('#phone')
          .type('84981458525')
          .should('have.value','84981458525')
          .clear()
          .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Selecionar um produto (YouTube) pelo seu nome texto',function(){
      cy.get('#product').select('youtube')
        .should('have.value','youtube')
    })

    it('Selecionar um produto (mentoria) pelo seu valor',function(){
      cy.get('#product').select('mentoria')
        .should('have.value','mentoria')
    })

    it('Selecionar um produto (blog) pelo seu indice',function(){
      cy.get('#product').select(1)
        .should('have.value','blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type = "radio"][value = "feedback"]').check()
        .should('have.value','feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type = "radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marca ambos checkboxes, depois desmarca o ultimo',function(){
      cy.get('input[type = "checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('Selecione uma imagem da pasta fixtures',function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Selecione uma imagem da pasta simulando um drag-and-drop', function(){
      cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Selecionar um arquivo utilizando uma fixture para qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')})
    })

    it('Verificar a politica de privacidade abre em outra aba sem a necessidade de um click',function(){
      cy.get('#privacy a').should('have.attr','target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('Talking About Testing').should('be.visible')
    })

    
  })
  