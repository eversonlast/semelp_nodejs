/******Módulo para quem esqueceu a senha 
 * Precisa melhorar para pegar o token da url
 */


const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const { existsOrError, notExistsOrErro, equalsOrError } = app.api.validation
    const{ sendEmail } = app.api.email


    /******Senha esquicida encrypta a senha para salvar novamente********/
    const passwordForgotten = async(req, res)=>{
    const usuario = {...req.body}
    try{
        const userFromDB = await app.db('users')
            .select('id', 'email')
            .where({cpf: usuario.cpf}).first()
        if(userFromDB){
            const userId = parseInt(userFromDB.id)
            const token =crypto.randomBytes(10).toString('hex')
            const email = userFromDB.email
            const msg = "Utiliza este código para trocar a senha " + token
            const titulo = "Troca de senha"
            const now = new Date();
            now.setDate(now.getDate()+1)
            
            await app.db('users')
                .update({passwordResetToken: token, passwordResetExpired: now})
                .where({id: userId})
                .then(_=>res.json(email.replace(email.substr(3, email.indexOf('@')-3),"***")))
                .catch(err=>res.status(500).send(err))
    
            await sendEmail(msg, email, titulo)
        }else{
            existsOrError(userFromDB, 'CPF não cadastrado!')
        }

    }catch(e){
            return res.status(400).send(e)
        }
    }

    /*******Encrypta a senha*********/
    const encrypPassword =  password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }


    /******Redifinada o token********/
    const resetPasswordToken =  async(req, res)=>{
        const usuario = { ...req.body }
        try{
        
            const userFromDB = await app.db('users')
                .select('passwordResetToken', 'passwordResetExpired', 'id')
                .where({passwordResetToken: usuario.token})
                .first()
        
            const userID = parseInt(userFromDB.id)
            if(!userFromDB){
                return res.status(404).send({error: 'Usuário não existe'})
            }

            if(usuario.token !== userFromDB.passwordResetToken){
                return res.status(404).send({error: 'Token inválido'})
            }

            now = new Date
            if(now > userFromDB.passwordResetExpired){
                return res.status(404).send({error: 'Token expirado, por favor gere um novo'})
            }

            equalsOrError(usuario.password, usuario.confirmPassword, 'Senhas não conferem')

            usuario.password = encrypPassword(req.body.password)
            delete usuario.confirmPassword
            
            await app.db('users')
                .update({password: usuario.password})
                .where({id: userID})
                .then(_=>res.json('Senha Alterada com sucesso'))
                .catch(err=>res.status(500).send(err))
        }catch(msg){
            return res.status(500).send(msg)
        }
    }


    /*******Redefina o senha de autenticação*******/
    const resetPasswordAuth = async(req, res)=>{
        const usuario = {...req.body}
        if(req.params.id){
            usuario.id = req.params.id            
        } else{
            return res.status(400).send({error: 'Por favor, informe o usuário'})
        }

        equalsOrError(usuario.password, usuario.confirmPassword, 'Senhas não conferem')
        
        usuario.password = encrypPassword(req.body.password)
        delete usuario.confirmPassword

        await app.db('users')
            .update({password: usuario.password})
            .where({id: usuario.id})
            .then(_=>res.status(204).send({success: 'Senha Alterada com sucesso'}))
            .catch(err=>res.status(500).send(err))
    }

    /*******Muda a usuaŕio, não se usar muito porque é CPF, 
     * é usado se cadastrou errado********/
    const changeUser =  async(req, res)=>{
        const usuario = {...req.body}
        const typeUser = await app.db('users')
            .select('tipoUsuario')
            .where({id: usuario.id})
        if(typeUser[0].tipoUsuario != 'admin'){
            res.json('Você não está autorizado a fazer está operação')
        }else{
            await app.db('users')
                .update({tipoUsuario: usuario.tipoUsuario})
                .where({cpf: usuario.cpf})
                .then(_=>res.json('O usuário foi alterado com sucesso'))
                .catch(err=> res.status(500).send(err))
        }
    }
    return { passwordForgotten, resetPasswordToken, resetPasswordAuth, changeUser }
}