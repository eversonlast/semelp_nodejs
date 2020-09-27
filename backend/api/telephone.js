module.exports = app => {
    const { existsOrError, notExistsOrError} = app.api.validation

    const save = async(req, res)=>{
        const telephone = {...req.body}
        if(req.params.id) telephone.id = req.params.id

        try{
            existsOrError(telephone.ddd, 'Não foi informado o DDD.')
            existsOrError(telephone.numeroTelefone, 'O número não foi informado')
            existsOrError(telephone.typePhone, 'Informe o tipo de telefone!')
            existsOrError(telephone.idUserTelephone, 'O id do  usuário não foi informado')

            const existsUser = await app.db('users')
                .where({id: telephone.idUserTelephone}).first()

            if(!existsUser){
                existsOrError(existsUser, 'Não existe este usuário')
            }
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(telephone.id){
           try{
                const rowsUpdate = await app.db('telephones')
                            .update(telephone)
                            .where({id: telephone.id})
                            .then(_=>res.status(204).send())

                    existsOrError(rowsUpdate, 'O id do usário é inválido')
            }catch(msg){
                return res.status(500).send()
            }
        }else{
            try{
                const rowsInsert =  app.db('telephones')
                    .insert(telephone)
                    .then(_=>res.status(204).send())

                existsOrError(rowsInsert, 'O id do uisário é inválido')
            }catch(msg){
                return res.status(500).send()
            }
        }
    }
    const remove = async(req, res)=>{
        try{
            const rowsDelete = await app.db('telephones')
                .where({id: req.params.id}).del()
            try{
                existsOrError(rowsDelete, 'Telefone não existe')
            }catch(msg){
                return res.status(400).send(msg)
            }
            return res.status(204).send('Telefone deletado com sucesso!')
        }catch(msg){
            res.status(500).send(msg)
        }
    }
    return { save, remove }
}