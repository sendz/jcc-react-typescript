describe("First Test", () => {
    it("Load the ToDoList Page", () => {
        cy.visit("http://localhost:3000")
        cy.contains("Simple ToDo List App")
    });

    it("Add new todo should update the list", () => {
        cy.get('input.form-control[type="text"]').type("Test Tambah ToDo")
        cy.get('button.btn.btn-primary').click()
        cy.get('div.hstack.todo-undone').contains("Test Tambah ToDo")
    })

    it("Check the todo", () => {
        cy.get('input[type="checkbox"]').first().click()
        cy.get('div.hstack.todo-done').contains("Test Tambah ToDo")
    })

    it("Delete todo", () => {
        cy.get('button.btn.btn-danger').first().click()
        cy.get('div.hstack.todo-done').should('not.exist')
    })
})