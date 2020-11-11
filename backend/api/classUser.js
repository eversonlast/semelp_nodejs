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
   
   const remove = async(req, res)=>{
       const classUser = {... req.body}
        try{
            existsOrError(classUser.idUser, 'Por favor, informe o ID do Usuário')
            existsOrError(classUser.idClass, 'Por favor, informe o ID da Turma')

            const rowsDeleted = await app.db('classesUsers')
                                        .where({idUser: classUser.idUser ,
                                                idClass: classUser.idClass})
                                        .del()
            
         existsOrError(rowsDeleted, 'O usuário ou a turma não existe!')

         res.status(200).send('Deletado com sucesso')
        }catch(msg){
            return res.status(500).send(msg)
        }
   } 

   const limit = 10
   const getAll = async(req, res)=>{
       const page = req.query.page || 1
       const result = await app.db('classesUsers').count('id').first()
       const count = parseInt(result.count)

       await app.db('classesUsers')
            .limit(limit).offset(page*limit-limit)
            .then(classUser=>res.json({data: classUser, count, limit}))
            .catch(err=>res.status(500).send(err))
   }

   const getByIDClass = async(req, res)=>{
       const idClass = {... req.params.id}
        await app.db.raw(`select "nomeModalidade", dias, horarios, nome, classes.id from classes
                        inner join "sportsCenters" as spt on spt.id = (select "idSportCenter" from classes where classes.id = ${idClass})
                        inner join modalities as m on m.id = (select "idModality" from classes where classes.id = ${idClass})
                        where classes.id = ${idClass}`)
   }

    return { save, remove, getAll, getByIDClass }
}