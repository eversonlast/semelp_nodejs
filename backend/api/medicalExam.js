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
    return{save}

}
