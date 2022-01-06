const { v4: uuid } = require('uuid')

describe('Test ToDo App', () => {
    let todoTitle
    before(() => {
        todoTitle = uuid();
    })

    it('Open the page', () => {
        cy.intercept(
            {
                method: 'GET',
                url: '/todo'
            },
            {status: 'OK', data: [
                {
                    id: "abcd",
                    title: "Test",
                    isDone: false
                },
                {
                    id: "abcd",
                    title: "Blah blah",
                    isDone: false
                }
            ]
        }
        ).as('getTodo')

        cy.visit('http://localhost:3000')
        cy.wait('@getTodo')
        cy.contains('Simple ToDo List App')
    })

    it('Add new todo to the list', () => {
        cy.intercept({
            method: 'POST',
            url: '/todo'
        }, (request) => {
            request.reply(
                {status: 'OK', data: {
                    id: todoTitle,
                    title: todoTitle
                }}
            )
        }).as('addTodo')
        cy.get('input.form-control[type="text"]').type(todoTitle)
        cy.get('button.btn.btn-primary').click()
        cy.wait('@addTodo')
        cy.get('div.todo-undone.hstack').contains(todoTitle)
    })

    it('Check the todo and move to Done', () => {
        cy.intercept({
            method: 'PATCH',
            url: '/todo/*'
        }, (request) => {
            request.reply({status: 'OK', data: {
                id: todoTitle,
                title: todoTitle,
                isDone: request.body.isDone
            }})
        }).as('updateTodo')
        cy.get('input[type="checkbox"] + label:contains('+todoTitle+')').click()
        cy.wait('@updateTodo')
        cy.get('div.todo-done.hstack').contains(todoTitle)
    })

    it("Delete", () => {
        cy.intercept({
            method: 'DELETE',
            url: '/todo/*'
        }, (request) => {
            request.reply({status: "OK", data: [], deleted: { id: todoTitle, title: todoTitle, isDone: true }})
        }).as('deleteTodo')
        cy.get('button.btn.btn-danger').first().click()
        cy.wait('@deleteTodo')
        cy.get('div.todo-done.hstack > div > label:contains('+todoTitle+')').should('not.exist')
    })
})
