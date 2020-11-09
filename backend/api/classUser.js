module.exports = app=>{
    const { existsOrError } = app.api.validation

    const save = async (req, res)=>{
        const classUser = {... req.body}
        if(req.params.id) classUser.id = req.params.id
        try{
            existsOrError(classUser.idUser, 'Por favor, informe o ID do Usuário.')
            existsOrError(classUser.idClass, 'Por favor, informe o ID da Turma.')
        }catch(ms){
            return res.status(500).send(msg)
        }

        if(classUser.id){
            app.db('classesUsers')
                .update(classUser)
                .where({id: req.params.id})
                .then(_=>res.status(200).send('Alterado com sucesso'))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('classesUsers')
                .insert(classUser)
                .then(_=>res.status(200).send('Salvo com sucesso'))
                .catch(err=>res.status(500).send(err))
        }
    }

    return { save }
}