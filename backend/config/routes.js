const admin = require('./accessControl/admin')
const secreAdmin = require('./accessControl/secreAdmin')
const userSecreAdmin = require('./accessControl/userSecreAdmin')
const profAdmin = require('./accessControl/profAdmin')
const secreProfAdmin = require('./accessControl/secreProfAdmin')




const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {uuid} = require('uuidv4')
const ano = new Date().getFullYear()
const uploadFolderAtestado = path.resolve(`../frontend/public/${ano}/upload/atestado`)
const uploadFolderPhoto = path.resolve(`../frontend/public/img/fotosUsers`)
const uploadFolderAtestadoAfastamento = path.resolve(`../frontend/public/img/${ano}/atestadoAfastamento`)
//if(!fs.existsSync(uploadFolder)){
  //  fs.mkdirSync(uploadFolder)
//}

const storage = multer.diskStorage({
    destination: uploadFolderAtestado,
    filename(req, file, cb){
        const filename = `${file.originalname}`
           return cb(null, filename)
       }
   })

const storagePhoto = multer.diskStorage({
    destination: uploadFolderPhoto,
    filename(req, file, cb){
        const filename = `${file.originalname}`
        return cb(null, filename)
    }
})

const storageAtestAfastamento = multer.diskStorage({
    destination: uploadFolderAtestadoAfastamento,
    filename(req, file, cb){
        const filename = `${file.originalname}`
        return cb(null, filename)
    }
})

const uplaodAtestafoAfast = multer({storage: storageAtestAfastamento})
const uploadAtestado = multer({storage: storage})
const upload = multer({storage: storagePhoto})
module.exports = app =>{

    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.users.save)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/validateUser', app.api.auth.validateUser)
    app.post('/forgotPassword', app.api.forgotPassword.passwordForgotten)
    app.put('/resetPassword', app.api.forgotPassword.resetPasswordToken)
    app.get('/consultarCep', app.api.apiCorreio.consultar)
    
    app.post('/upload', uploadAtestado.single('file') ,(req, res)=>{
        return res.json({path: `${uploadFolderAtestado}`})
    })

    app.post('/uploadPhoto', upload.single('file'), (req, res)=>{
        return res.json({path: `${uploadFolderPhoto}`})
    })
   
    app.post('/uploadAtestadoAfast', uplaodAtestafoAfast.single('file'), (req, res)=>{
        return res.json({path: `${uploadFolderAtestadoAfastamento}`})
    })
    
    app.get('/modality', app.api.modality.get)
    
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(secreAdmin(app.api.users.save))
        .get(secreAdmin(app.api.users.get))
    
    app.route('/usersPhoto/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.users.savePhoto)
    
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

    app.route('/classSport/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.modalitySportCenter.getClassBySportCenter)

    app.route('/classUser')
        .all(app.config.passport.authenticate())
        .post(app.api.classUser.save) 
        .get(app.api.classUser.getAll)
    
    app.route('/classUser/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.classUser.remove))
        .put(app.api.classUser.save)
        .get(app.api.classUser.getByIDClassActive)

    app.route('/classUserDesactive/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.getByIdClassDesactive)
        .put(app.api.classUser.updateDesactive)

    app.route('/classUserByActive/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.classUser.updateForDesactive)

    app.route('/classUserDesactive')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.getAllClassDesactive)

    app.route('/classByNameDesactive')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.getClassByNameDesactive)

    app.route('/classUserActive')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.getAllClassActive)

    app.route('/userClass/:id')
        .all(app.config.passport.authenticate())
        .get(userSecreAdmin(app.api.classUser.getByIdUser))

    app.route('/numberStudentPerClass/:idClass/:idSportCenter')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.numberOfStudentsPerClass)
    
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
    
    app.route('/waitingListCount')
        .all(app.config.passport.authenticate())
        .get(app.api.waitingList.countUserWaitingList)
    
    app.route('/waitingListUser/:idUser')
        .all(app.config.passport.authenticate())
        .get(app.api.waitingList.getWaitingListByUser)
        .delete(app.api.waitingList.removeWaitList)

    app.route('/medicalExam')
        .all(app.config.passport.authenticate())
        .post(app.api.medicalExam.save)
        .get(app.api.medicalExam.getDesactive)

    app.route('/medicalExam/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.medicalExam.getById)
        .delete(app.api.medicalExam.remove)
        .put(app.api.medicalExam.activeExam)        

    app.route('/medicalExamActive')
        .all(app.config.passport.authenticate())
        .get(app.api.medicalExam.getActive)

    app.route('/medicalExamUpdate/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.medicalExam.save)

    app.route('/countUser/:idClass')
       .all(app.config.passport.authenticate())
        .get(app.api.classUser.countUser)   
    

    app.route('/numberClass/:idClass')
        .all(app.config.passport.authenticate())
        .get(app.api.classUser.verifyNumberStudents)


    app.route('/atestadoMedicoAfast')
        .all(app.config.passport.authenticate())
        .post(app.api.examMedicalAfast.save)
        .get(app.api.examMedicalAfast.listAllExamAfast)

    app.route('/atestadoMedicoAfast/:idUser')
        .all(app.config.passport.authenticate())
        .get(app.api.examMedicalAfast.getAtestadoByIdUser)

    app.route('/atestadoMedicoAfastDate/:idUserDate')
        .all(app.config.passport.authenticate())
        .get(app.api.examMedicalAfast.getAtestadoByDate)

    app.route('/allModalityBySport')
        .all(app.config.passport.authenticate())
        .get(app.api.modality.getModalityBySportCenter)
}


