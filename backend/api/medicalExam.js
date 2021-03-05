module.exports = app =>{
    const {existsOrError} = app.api.validation

    const save = async(req, res)=>{
        const medicalExam = {... req.body}

        if(req.params.id) medicalExam.id = req.params.id

        const dataValidade = medicalExam.examMonth.split("-")
        console.log(dataValidade)

        medicalExam.validadeExam = new Date(parseInt(dataValidade[0]) +1, parseInt(dataValidade[1]) - 1, parseInt(dataValidade[2]))

        try{
            existsOrError(medicalExam.validadeExam, "Por favor, Informe a Validade do Exame.")
            existsOrError(medicalExam.examMonth, "Por favor, informe o mês do exame.")
            existsOrError(medicalExam.idUser, "Por favor, informe o id do usuário")
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
        await app.db.raw(`SELECT u.id, TO_CHAR("examMonth", 'DD/MM/YYYY'), TO_CHAR("validadeExam", 'DD/MM/YYYY), "activeExam", nome as "NomeAluno", "idUser"`)
        
        
        //('medicalExams as me')
          //      .join('users as u', 'u.id', 'me.idUser')
            //    .select(db.raw('TO_CHAR("examMonth", DD/MM/YYYY)','u.id', 'validadeExam', 'activeExam', 'nome as NomeAluno',  'idUser'))
              //  .limit(limit).offset(page*limit-limit)
                //.then(medicalExam=>res.json({data: medicalExam, count, limit}))
                //.catch(err=>res.status(500).send(err))
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
