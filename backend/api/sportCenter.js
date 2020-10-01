
module.exports = app =>{
    const { existsOrError, notExistsOrError } = app.api.validation
    
    const save = async(req, res)=>{
        const sportCenter = { ...req.body }

        if(req.params.id) sportCenter.id = req.params.id

        try{
            existsOrError(sportCenter.nome, "Por favor, informe o nome do Centro Esportivo")
            existsOrError(sportCenter.nomeLogradouro, "Por favor, informe a rua do Centro Esportivo")
            existsOrError(sportCenter.numero, "Por favor, informe o número do Centro Esportivo") 
            existsOrError(sportCenter.bairro, "Por favor, infrome o bairro do Centro Esportivo")
            existsOrError(sportCenter.cep, "Por favor, informe o cep do Centro Esportivo")
            existsOrError(sportCenter.telefone, 'Por favor, informe pelo menos um telefone')


        }catch(msg){
            return res.status(400).send(msg)
        }

        if(sportCenter.id){
            app.db('sportsCenters')
                .update(sportCenter)
                .where({id: sportCenter.id})
                .then(_=>res.status(200).send({ success: "Atualizado com sucesso"}))
                .catch(err=> res.status(500).send(err))
        }else{
            app.db('sportsCenters')
                .insert(sportCenter)
                .then(_=>res.status(200).send({success: "Salvo com sucesso"}))
        }
        
    }
    
    const getById = (req, res)=>{

        app.db('sportsCenters')
            .where({id: req.params.id})
            .first()
            .then(sportCenter=>{ res.json(sportCenter)})
            .catch(err=> res.status(500).send(err))
    }

    const get = (req, res)=>{
        app.db('sportsCenters')
            .then(sportsCenters=>res.json(sportsCenters))
            .catch(err=>res.status(500).send(err))
    }
    const remove = async (req, res)=>{
        try{
            existsOrError(req.params.id, "Por favor, informe o id")    

            const rowsDeleted = await app.db('sportsCenters')
                    .where({id: req.params.id}).del()
            existsOrError(rowsDeleted, "Centro Esportivo não cadastrado.")
            
            res.status(200).send({success: "Deletado com sucesso"})
        }catch(e){
            res.status(500).send(e)
        }
    }
    return { save, getById, get, remove }
}