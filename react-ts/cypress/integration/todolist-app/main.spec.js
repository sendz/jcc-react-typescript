const { v4: uuid } = require('uuid')

describe('Test ToDo App', () => {
    let todoTitle
    before(() => {
        todoTitle = uuid();
    })

    it('Open the page', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Simple ToDo List App')
    })

    it('Add new todo to the list', () => {
        cy.get('input.form-control[type="text"]').type(todoTitle)
        cy.get('button.btn.btn-primary').click()
        cy.get('div.todo-undone.hstack').contains(todoTitle)
    })

    it("Check the todo and move to Done", () => {
        cy.get('input[type="checkbox"] + label:contains('+todoTitle+')').click()
        cy.get('div.todo-done.hstack').contains(todoTitle)
    })

    it("Delete", () => {
        cy.get('button.btn.btn-danger').first().click()
        cy.get('div.todo-done.hstack > div > label:contains('+todoTitle+')').should('not.exist')
    })
})
