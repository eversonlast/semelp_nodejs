module.exports =  middleware =>{
    return(req, res, next)=>{
        const paramsId = parseInt(req.params.id)
        const authorization = req.user.tipoUsuario === 'admin' | req.user.tipoUsuario === 'secre' | req.user.id === paramsId
        if(authorization){
            middleware(req, res, next)
        }else{
            res.status(401).send('Usuário não autorizado.')
        }
    }
}