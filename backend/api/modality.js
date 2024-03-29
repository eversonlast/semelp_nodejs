module.exports = app =>{
    const { existsOrError, notExistsOrError} = app.api.validation

    const save = async(req, res)=>{
        const modality = { ...req.body}

        if(req.params.id) modality.id = req.params.id
        if(modality.departamento == "lazer") modality.needAttestation = true

        try{
            existsOrError(modality.nomeModalidade, "Por favor, informe qual é a modalidade.")
            existsOrError(modality.departamento, "Por favor, informe qual é o departamento.")
            existsOrError(modality.idResponsabilityModality, "Por favor, informe qual é o responsável pela modalidade.")
            existsOrError(modality.needAttestation, "Por favor, informe se modalidade precisa de atestado.")
            
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(modality.id){
            app.db('modalities')
                .update(modality)
                .where({id: modality.id})
                .then(_=> res.status(200).send({success:"Alterado com sucesso."}))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('modalities')
                .insert(modality)
                .then(_=>res.status(200).send({success:"Modalidade inserido com sucesso"}))
                .catch(err=>res.status(500).send(err))
        }
    }
    const limit = 10
    const get = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('modalities').count('id').first()
        const count = parseInt(result.count)
        await app.db.raw(`select * from modalities
                    limit ${limit} offset ${page*limit-limit}`)
            .then(modalities=>res.json({data: modalities.rows, count, limit}))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async(req, res)=>{
        await app.db('modalities')
            .where({id: req.params.id})
            .first()
            .then(modality=>res.json(modality))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async(req, res)=>{
        try{
            const rowsDeleted = await app.db('modalities')
                .where({id: req.params.id}).del()
            try{
                existsOrError(rowsDeleted, "A modalidade não Cadastrada")
            }catch(e){
                return res.status(400).send(e)
            }
            return res.status(200).send("Deletado com sucesso")
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    const getResponsability = async(req, res)=>{
        try{
            app.db('users')
                .select('nome', 'id')
                .where('tipoUsuario', 'admin')
                .orWhere('tipoUsuario', 'prof')
                .first()
                .then(users=>res.json([users]))
                .catch(err=>res.status(500).send(err))
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    const getModalityBySportCenter = async(req, res)=>{
        await app.db('modalities as m')
                .select('m.nomeModalidade', 'm.departamento', 'u.nome as nomeProfessor')
                .join('modalitiesSportsCenters as mspt', 'm.id', 'mspt.idModality')
                .join('users as u', 'u.id', 'm.idResponsabilityModality')
                .where("mspt.idSportCenter", req.query.idSport)
                .then(modality=>res.json(modality))
                .catch(err=>res.status(500).send(err))
    }

    return { save, get, getById, remove, getResponsability, getModalityBySportCenter }
}