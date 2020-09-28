const admin = require('./accessControl/admin')
const secreAdmin = require('./accessControl/secreAdmin')
const userSecreAdmin = require('./accessControl/userSecreAdmin')
const profAdmin = require('./accessControl/profAdmin')

module.exports = app =>{

    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.users.save)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/validateUser', app.api.auth.validateUser)
    app.post('/forgotPassword', app.api.forgotPassword.passwordForgotten)
    app.put('/resetPassword', app.api.forgotPassword.resetPasswordToken)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(secreAdmin(app.api.users.save))
        .get(secreAdmin(app.api.users.get))
    
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())    
        .put(userSecreAdmin(app.api.users.save))        
        .get(userSecreAdmin(app.api.users.getById))
        .delete(userSecreAdmin(app.api.users.remove))
    
    app.route('/resertPassword/:id')
        .all(app.config.passport.authenticate())   
        .put(userSecreAdmin(app.api.forgotPassword.resetPasswordAuth))
    
    app.route('/changeTypeUser')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.forgotPassword.changeUser))
        
    app.route('/telephone')
        .post(app.api.telephone.save)
    
    app.route('/telephone/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.telephone.remove)
    
    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
    
    app.route('/sportCenter')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.sportCenter.save))
        .get(app.api.sportCenter.get)
    
    app.route('/sportCenter/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.sportCenter.save))
        .get(app.api.sportCenter.getById)
        .delete(admin(app.api.sportCenter.remove))
}