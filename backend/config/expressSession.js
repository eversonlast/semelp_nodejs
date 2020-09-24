const passport = require('passport')
const session = require('express-session')
const express = require('express')

var app = express()

app.set('trust proxy', 1)
app.use(session({
    secret: '122334354',
    resave: false,
    saveUninitialized: false,
    cookie:{ secure: true }
}))