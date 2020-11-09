module.exports = app =>{
    const { existsOrError, notExistsOrError, daysOfClass } = app.api.validation

    const save = async(req, res)=>{
        const classes = {...req.body}

        if(req.params.id) classes.id = req.params.id

        try{
            existsOrError(classes.dias, 'Por favor, informe os dias da turma.')
            existsOrError(classes.horarios, 'Por favor, informe o horário da turma ')
            existsOrError(classes.idProfessorResponsability, 'Por favor, informe o ID do Professor da turma.')
            existsOrError(classes.idSportCenter, 'Por favor, informe o ID do Centro Esportivo.')
            existsOrError(classes.idModality, 'Por favor, informe o ID da Modality da Turma.')
            existsOrError(classes.faixaEtaria, 'Por favor, informe a faixa etária da turma.')

            daysOfClass(classes.dias, 'Por favor, digite dias válidos de turma.')
            
            
            const verification = await app.db('modalities')
                                        .select('departamento')
                                        .where({id: classes.idModality})           

            const sportCenterInModality = await app.db('classes')
                    .where({idSportCenter: classes.idSportCenter})
                    .where({idModality: classes.idModality})
                    .where({faixaEtaria: classes.faixaEtaria})
                    .first()


            if(verification[0].departamento == 'esporte'){
                if(sportCenterInModality){
                    notExistsOrError(sportCenterInModality, 'A modalidade já está cadastrada no Centro Esportivo')
                }
            }
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(classes.id){
            await app.db('classes')
                .update(classes)
                .where({id: classes.id})
                .then(_=>res.status(200).send({success: 'Alterado com sucesso'}))
                .catch(err=>res.status(500).send(err))
        }else{
            await app.db('classes')
                .insert(classes)
                .then(_=>res.status(200).send({success: 'Salvo com sucesso'}))
                .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10
    const getAll = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('classes').count('id').first()
    const count = parseInt(result.count)
        await app.db('classes')
                .limit(limit).offset(page*limit-limit)
                .then(classes=>res.json({data: classes, count, limit}))
                .catch(err=>res.status(500).send(err))
    }

    const getById = async(req, res)=>{
        await app.db('classes')
                .where({id: req.params.id})
                .first()
                .then(classes=>res.json(classes))
                .catch(err=>res.status(500).send(err))
    }

    const remove = async(req, res)=>{
        try{
            existsOrError(req.params.id, 'Por favor, informe o Id da Turma.')

            const rowsDeleted = await app.db('classes')
                                        .where({id: req.params.id})
                                        .del()

            existsOrError(rowsDeleted, 'A turma não está cadastrada no sistema.')

            res.status(200).send('Deletado com sucesso.')
        }catch(msg){
            return res.status(500).send(msg)
        }
    }
    return { save, getAll, getById, remove }
}