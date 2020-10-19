module.exports = app =>{
    const { existsOrError } = app.api.validation
    const save = async(req, res)=>{
        const modalitySportCenter = { ...req.body }
        if(req.params.id) modalitySportCenter.id = req.params.id
        try{
            existsOrError(modalitySportCenter.idModality, "Por favor, informe o id da Modalidade")
            existsOrError(modalitySportCenter.idSportCenter, "Por favor, informe o Centro Esportivo.")
        }catch(msg){
            return res.status(500).send(msg)
        }
        if(modalitySportCenter.id){
            app.db('modalitiesSportsCenters')
                .update(modalitySportCenter)
                .where({id: modalitySportCenter.id})
                .then(_=>res.status(200).send({success: "Atualizado com sucesso."}))
                .catch(err=>res.status(500).send(err))
        }else{
            app.db('modalitiesSportsCenters')
                .insert(modalitySportCenter)
                .then(_=>res.status(200).send({success: "Salvo com sucesso"}))
                .catch(err=>res.status(500).send(err))
        }
    }
    const remove = async (req, res)=>{
        try{
            existsOrError(req.params.id, "Por favor, informe o id.")

            const rowsDeleted = await app.db('modalitiesSportsCenters')
                                        .where({id: req.params.id})
                                        .del()
            existsOrError(rowsDeleted, "A modalidade ou Centro esportivo não existe")

            res.status(200).send({success: 'Deletado com sucesso.'})

        }catch(msg){
            res.status(400).send(msg)
        }
    }
    const limit = 10 
    const getSportCenter = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db.raw(`select count("idSportCenter") from "modalitiesSportsCenters" where "idSportCenter" = ${req.params.id}`)
        const count = parseInt(result.rows[0].count)

        app.db.raw(`select nome as "Local", "nomeModalidade", m.id as "idModalidade", departamento, "idResponsabilityModality"
                    from "sportsCenters" 
                    right join "modalitiesSportsCenters" as mdc on mdc."idSportCenter" = "sportsCenters".id
                    right join modalities as m on mdc."idModality" = m.id
                    where "idSportCenter" = ${req.params.id}        
                    limit ${limit} offset ${page*limit-limit}`)
                .then(modalities=> res.json({data: modalities.rows, count, limit}))
                .catch(err=>res.status(500).send(err))
    }

    const getModality = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db.raw(`select count("idModality") from "modalitiesSportsCenters" where "idModality" = ${req.params.id}`)
        const count = parseInt(result)

        app.db.raw(`select nome, "nomeModalidade", "sportsCenters".id
                    from "sportsCenters" 
                    right join "modalitiesSportsCenters" as mdc on mdc."idSportCenter" = "sportsCenters".id
                    right join modalities as m on mdc."idModality" = m.id
                    where "idModality" = ${req.params.id}
                    limit ${limit} offset ${page*limit-limit}`)
                .then(sportCenter=> res.json({data: sportCenter.rows, count, limit}))
                .catch(err=>res.status(500).send(err))
    }

    return { save, remove, getSportCenter, getModality }
}