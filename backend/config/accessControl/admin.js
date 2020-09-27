module.exports =  middleware =>{
    return(req, res, next)=>{
        if(req.user.tipoUsuario === 'admin'){
            middleware(req, res, next)
        }else{
            res.status(401).send('Usuário não autorizado.')
        }
    }
}