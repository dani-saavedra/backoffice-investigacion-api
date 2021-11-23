const { Router } = require('express')
const singIn = require('../controller/auth.controller')

const route = Router();

route.use((request,response,next)=>{

  //  response.header()
next()
})

route.post('/login', singIn)

module.exports = route