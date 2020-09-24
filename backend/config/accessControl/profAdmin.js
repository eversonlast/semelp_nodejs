module.exports =  middleware =>{
    return(req, res, next)=>{
        const authorization = req.user.tipoUsuario === 'admin' | req.user.tipoUsuario === 'prof'
        if(authorization){
            middleware(req, res, next)
        }else{
            res.status(401).send('Usuário não autorizado.')
        }
    }
}