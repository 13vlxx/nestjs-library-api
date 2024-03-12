describe('Register route test', () => {
  it('Email already used', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/register',
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'Test1234**',
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.body.message).that.is.eq('DUPLICATE_KEY_ERROR');
    });
  });

  it('Password not enough strong', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/auth/register',
      body: {
        name: 'test',
        email: 'test@test.com',
        password: 'Test1234*',
      },
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.be.eq(400);
      expect(resp.body).to.have.property('message').that.is.a('array');
    });
  });
});
