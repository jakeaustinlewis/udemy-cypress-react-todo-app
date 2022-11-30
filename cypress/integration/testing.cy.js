///<reference types="Cypress"

describe('Request command suite', () => {
  let todo;
  it('Get request', () => {
    cy.request('GET', 'http://localhost:8080/todos').then((response) => {
      cy.log(response.status)
      cy.log(response.statusText)
      cy.log(response.duration)
      cy.log(response.headers)
      cy.log(response.body)
      expect(response.status).to.be.eq(200)
      expect(response.duration).to.be.below(20000)
      expect(response.body[0].isComplete).to.be.false
    })
  })

  it('post request', () => {
    cy.request('POST', 'http://localhost:8080/todos', {
      name: "testing123",
      isComplete: false
    }).then((response) => {
      todo = response.body;
      expect(response.status).to.be.eq(201)
    })
  })

  it('Put request', () => {
    cy.request('PUT', `http://localhost:8080/todos/${todo.id}`, {
      name: todo.name,
      id: todo.id,
      isComplete: true
    }).then((response) => {
      expect(response.status).to.be.eq(200)
    })
  })

  it('Delete request', () => {
    cy.request('DELETE', `http://localhost:8080/todos/${todo.id}`).then((response) => {
      expect(response.status).to.be.eq(200)
    })
  })

  it('Secure API request', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/courses',
      auth: {
        bearer: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXIyMjIyQG1haWwuY29tIiwiaWF0IjoxNjY5NzQyNDkyLCJleHAiOjE2Njk3NDYwOTIsInN1YiI6IjYifQ.oJTbuCmn7J_PKjJsvdBprhjccXoSeppEab-a5Bllaoc"
      }
    })
  })
})
