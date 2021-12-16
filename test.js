const server = require('./index.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);


describe('User Endpoints', () => {

    it('GET /hello-world should show a user', async () => {
        const res = await requestWithSupertest.get('/hello-world')
        expect(res.statusCode).toEqual(200)
    });

});


