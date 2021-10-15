const app = require('express')()
const consign = require('consign')
const db = require('./config/db.js')
const mongoose = require('mongoose')
const session = require('express-session')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose
app.session = session

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/expressSession.js')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, ()=>{
    console.log('Backend funcionando...')
})