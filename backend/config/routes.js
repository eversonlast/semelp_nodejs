const admin = require('./accessControl/admin')
const secreAdmin = require('./accessControl/secreAdmin')
const userSecreAdmin = require('./accessControl/userSecreAdmin')
const profAdmin = require('./accessControl/profAdmin')
const secreProfAdmin = require('./accessControl/secreProfAdmin')

module.exports = app =>{

    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.users.save)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/validateUser', app.api.auth.validateUser)
    app.post('/forgotPassword', app.api.forgotPassword.passwordForgotten)
    app.put('/resetPassword', app.api.forgotPassword.resetPasswordToken)
   
    app.get('/modality', app.api.modality.get)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(secreAdmin(app.api.users.save))
        .get(secreAdmin(app.api.users.get))
    
    
    app.route('/users/:id')
        .all(app.config.passport.authenticate())    
        .put(userSecreAdmin(app.api.users.save))        
        .get(userSecreAdmin(app.api.users.getById))
        .delete(userSecreAdmin(app.api.users.remove))
    
    app.route('/resetPassword/:id')
        .all(app.config.passport.authenticate())   
        .put(app.api.forgotPassword.resetPasswordAuth)
    
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

    app.route('/modality')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.modality.save))
        .get(secreAdmin(app.api.modality.get))
        
    app.route('/modality/:id')
        .all(app.config.passport.authenticate())
        .get(secreAdmin(app.api.modality.getById))    
        .put(admin(app.api.modality.save))
        .delete(admin(app.api.modality.remove))

    app.route('/modalitySportCenter')
        .all(app.config.passport.authenticate())
        .post(secreAdmin(app.api.modalitySportCenter.save))
        .delete(admin(app.api.modalitySportCenter.remove))

    app.route('/sportCenterModality/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.modalitySportCenter.getSportCenter)
        
    app.route('/modalitySportCenter/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.modalitySportCenter.getModality)
    
    app.route('/responsabilityModality')
        .all(app.config.passport.authenticate())
        .get(app.api.modality.getResponsability)
    
    app.route('/class')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.class.save))
        .get(app.api.class.getAll)

    app.route('/class/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.class.getById)
        .put(admin(app.api.class.save))
        .delete(admin(app.api.class.remove))

    app.route('/classUser')
        .all(app.config.passport.authenticate())
        .post(app.api.classUser.save)
        .get(app.api.class.getAll)
    
    app.route('/classUser/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.classUser.remove))
        .put(app.api.classUser.save)
        .get(app.api.classUser.getByIDClass)

    app.route('/userClass/:id')
        .all(app.config.passport.authenticate())
        .get(userSecreAdmin(app.api.classUser.getByIdUser))
    
    app.route('/lackByMounth')
        .all(app.config.passport.authenticate())
        .post(app.api.classUser.saveLack)

    app.route('/lackByMounthUser/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.getByIdUserLack)
        .put(app.api.classUser.saveLack)

    app.route('/waitingList')
        .all(app.config.passport.authenticate())
        .post(app.api.waitingList.saveWaitingList)

    app.route('/waitingList/:idClass')
        .all(app.config.passport.authenticate())
        .get(app.api.waitingList.getWaitByClass)
}