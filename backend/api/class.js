/*****Este módulo é para o controle de Turma, esse módula vai dar base para 
 * a matrícula, é a partir dele que será feito a matrícula...
 *********/
module.exports = app =>{
    const { existsOrError, notExistsOrError, daysOfClass } = app.api.validation
    const knex = require('knex')

    /*****Para salvar uma turma********/
    const save = async(req, res)=>{
        const classes = {...req.body}

        if(req.params.id) classes.id = req.params.id

        try{
            existsOrError(classes.dias, 'Por favor, informe os dias da turma.')
            existsOrError(classes.horarios, 'Por favor, informe o horário da turma ')
            existsOrError(classes.idProfessorResponsability, 'Por favor, informe o ID do Professor da turma.')
            existsOrError(classes.idSportCenter, 'Por favor, informe o ID do Centro Esportivo.')
            existsOrError(classes.idModality, 'Por favor, informe o ID da Modality da Turma.')
            existsOrError(classes.idadeMinima, 'Por favor, informe a Idade Mínima da turma.')
            existsOrError(classes.idadeMaxima, 'Por favor, informe a Idade Máxima da turma.')

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

    /******Pega todas as turmas**************/

    const limit = 10
    const getAll = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('classes').count('id').first()
        const count = parseInt(result.count)
        await app.db('classes as c')
                .join('users as u', 'u.id', 'c.idProfessorResponsability')
                .join('sportsCenters as spt', 'spt.id', 'c.idSportCenter')
                .join('modalities as m', 'm.id', 'c.idModality')
                .select('c.*', 'u.nome as nomeProfessor', 'spt.nome as centroEsportivo', 'm.nomeModalidade', 'm.departamento', 'maxLackMounth as maximoFaltasMes', 'studentsNumber as numerosDeAlunos')
                .limit(limit).offset(page*limit-limit)
                .then(classes=>res.json({data: classes, count, limit}))
                .catch(err=>res.status(500).send(err))
    }

    /******Pega uma turma por ID**********/
    async function getById (req, res, a){
        const idClass = req.params.id ? req.params.id : a
        await app.db('classes as c')
                .join('users as u', 'u.id', 'c.idProfessorResponsability')
                .join('sportsCenters as spt', 'spt.id', 'c.idSportCenter')
                .join('modalities as m', 'm.id', 'c.idModality')
                .select('c.*', 'spt.nome as centroEsportivo', 'nomeModalidade')
                .where({'c.id': idClass})
                .first()
                .then(classes=>res.json(classes))
                .catch(err=>res.status(500).send(err))
    }

    /*********Remove uma turma, tudo hard delete********/
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


    /*********Adaptação para limite de idade********/
    const salveAgeLimit = async(req, res)=>{
        const salveAge = {...req.body}

        if(req.params.id) salveAge.id = req.params.id;

        try{
            existsOrError(salveAge.age, "Por favor, informe a idade!")
        }catch(msg){
            return res.status(400).send(msg);
        }

        if(salveAge.id){
            await app.db('tb_control_age')
                .where({id: salveAge.id})
                .update(salveAge)
                .then(()=>res.status(200).send({success: 'Foi alterado com sucesso!'}))
                .catch(err=>res.status(500).send(err))
        }else{
            salveAge.ativo= 1;
            await app.db('tb_control_age')
                .insert('tb_control_age')
                .then(()=>res.status(200).send({success: 'Foi Adicionado com sucesso!'}))
                .catch(err=>res.status(500).send(err))
        }
    }
    return { save, getAll, getById, remove, salveAgeLimit}
}