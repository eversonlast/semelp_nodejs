module.exports = app =>{
    const { existsOrError, notExistsOrError} = app.api.validation

    const save = async(req, res)=>{
        const modality = { ...req.body}

        if(req.params.id) modality.id = req.params.id

        try{
            existsOrError(modality.nomeModalidade, "Por favor, informe qual é a modalidade.")
            existsOrError(modality.setor, "Por favor, informe qual setor que pertence a modalidade.")
            existsOrError(modality.departamento, "Por favor, informe qual é o departamento.")
            existsOrError(modality.idResponsabilityModality, "Por favor, informe qual é o responsável pela modalidade.")
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
        app.db.raw(`select * from modalities
                    limit ${limit} offset ${page*limit-limit}`)
            .then(modalities=>res.json({data: modalities.rows, count, limit}))
            .catch(err=>res.status(500).send(err))
    }

    const getIdBy = async(req, res)=>{
        app.db('modalities')
            .where({id: req.params.id})
            .first()
            .then(modality=>res.json(modality))
            .catch(err=>res.status(500).send(err))
    }

    const remove = async(req, res)=>{
        try{
            existsOrError(req.params.id, "Por favor, informe o id")

            const rowsDeleted = app.db('modalities')
                .where({id: req.params.id})
                .del()
            existsOrError(rowsDeleted, "A modalidade não Cadastrada")

            res.status(200).send({success: "Deletado com sucesso"})
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    return { save, get, getIdBy, remove }
}