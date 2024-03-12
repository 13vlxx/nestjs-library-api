describe('template spec', () => {
  it('Unauthorized to login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/login',
      body: {
        email: 'test@test.com',
        password: 'Test1234*',
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.body.error).to.be.eq('Unauthorized');
    });
  });

  it('Login successfully', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/login',
      body: {
        email: 'test@test.com',
        password: 'Test1234**',
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.be.eq(201);
      expect(resp.body).to.have.property('token').that.is.a('string');
    });
  });
});
