module.exports = app =>{
    const {existsError} = app.api.validation

    const save = async(req, res)=>{
        const medicalExam = {... req.body}

        if(req.params.id) medicalExam.id = req.params.id

        try{
            existsError(medicalExam.validadeExam, "Por favor, Informe a Validade do Exame.")
            existsError(medicalExam.examMonth, "Por favor, informe o mês do exame.")
            existsError(medicalExam.idUser, "Por favor, informe o id do usuário")
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(medicalExam.id){
            await app.db('medicalExams')
                    .update(medicalExam)
                    .where({id: medicalExam.id})
                    .then(_=>res.status(200).send({success: "Exame Alterado com sucesso"}))
                    .catch(err=>res.status(500).send(err))
        }else{
            await app.db('medicalExams')
                    .insert(medicalExam)
                    .then(_=>res.status(200).send({success:"Exame Cadastrado com sucesso"}))
                    .catch(err=>res.status(500).send(err))
        }
    }

    const limit = 10
    const get = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('medicalExams').count('id').first()
        const count = parseInt(result.count)
        await app.db('medicalExams')
                .limit(limit).offset(page*limit-limit)
                .then(medicalExam=>res.json({data: medicalExama.rows, count, limit}))
                .catch(err=>res.status(500).send(err))
    }

    const getById = async(req, res)=>{
        await app.db('medicalExams')
                .where({id: req.params.id})
                .then(medicalExam=>res.json(medicalExam))
                .catch(err=>res.status(500).send(err))
    }

    const remove = async(req, res)=>{
        try{
            const rowsDeleted = await app.db('medicalExams')
                            .where({id: req.params.id}).del()
            try{
                existsError(rowsDeleted, "O Exame Médico não Cadastra")
            }catch(msg){
                return res.status(400).send(msg)
            }
            res.status(200).send("Deletado com sucesso.")
        }catch(msg){
            res.status(500).send(msg)
        }   

    }
    return{save, get, getById, remove}

}
