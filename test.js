const api = require("./index")
const request = require('supertest')

describe('Inicio server', ()=>{
    it('Health check express', async()=>{
        const resp = await request(api).get('/healt-check')
        expect(resp.statusCode).toEqual(200)
    })
})
