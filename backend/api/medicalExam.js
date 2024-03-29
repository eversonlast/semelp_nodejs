/****Exame para considerar adaptado para modalidade 
*** */

const knexfile = require('../knexfile')

module.exports = app =>{
    const {existsOrError} = app.api.validation
    const knex = require('knex')(knexfile)

    /***Para Salvar o atestado********/
    const save = async(req, res)=>{
        const medicalExam = {... req.body}

        if(req.params.id) medicalExam.id = req.params.id

        const dataValidade = String(medicalExam.examMonth).split("-")

        medicalExam.validadeExam = new Date(parseInt(dataValidade[0]) +1, parseInt(dataValidade[1]) - 1, parseInt(dataValidade[2]));
        if(!req.params.id) medicalExam.activeExam = false;

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
    

    /*********Pega todos atestados desativados*********/
    const limit = 10
    const getDesactive = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('medicalExams').where({activeExam: false}).count('id').first()
        const count = parseInt(result.count)
        await app.db.raw(`SELECT me.id, TO_CHAR("examMonth", 'DD/MM/YYYY') as "examMonth", TO_CHAR("validadeExam", 'DD/MM/YYYY') as "validadeExam", "activeExam", 
                        nome as "NomeAluno", "idUser"
                        from "medicalExams" as me
                        inner join users as u on me."idUser" = u.id
                        where me."activeExam" = false`)
                        .then(medicalExam=>res.json({data: medicalExam.rows, count, limit}))
                        .catch(err=>res.status(500).send(err))
        
        
        //('medicalExams as me')
          //      .join('users as u', 'u.id', 'me.idUser')
            //    .select(db.raw('TO_CHAR("examMonth", DD/MM/YYYY)','u.id', 'validadeExam', 'activeExam', 'nome as NomeAluno',  'idUser'))
              //  .limit(limit).offset(page*limit-limit)
                //.then(medicalExam=>res.json({data: medicalExam, count, limit}))
                //.catch(err=>res.status(500).send(err))
    }

    /*******Pega todos exames ativos********/
    const getActive = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('medicalExams').where({activeExam: true}).count('id').first()
        const count = parseInt(result.count)
        await app.db.raw(`SELECT me.id, TO_CHAR("examMonth", 'DD/MM/YYYY') as "examMonth", TO_CHAR("validadeExam", 'DD/MM/YYYY') as "validadeExam", "activeExam", 
                        nome as "NomeAluno", "idUser"
                        from "medicalExams" as me
                        inner join users as u on me."idUser" = u.id
                        where me."activeExam" = true`)
                        .then(medicalExam=>res.json({data: medicalExam.rows, count, limit}))
                        .catch(err=>res.status(500).send(err))
    }

    /******Pega por ID os atestados********/
    const getById = async(req, res)=>{
        await app.db('medicalExams as me')
                .join('users as u', 'u.id', 'me.idUser')
                .select(knex.raw(`u.id, TO_CHAR("validadeExam", 'DD/MM/YYYY') as "validadeExam", TO_CHAR("examMonth", 'DD/MM/YYYY') as "examMonth", "activeExam", nome as "NomeAluno", "idUser", "pathMedicalExam"`))
                .whereRaw(`me.id = ${req.params.id}`)
                .then(medicalExam=>res.json(medicalExam))
                .catch(err=>res.status(500).send(err))
    }


    /********Apaga os atestados do BD, hard delete******/
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

    /******Ativa o exame médico******/
    const activeExam = async(req, res)=>{
        await app.db('medicalExams')
                .update({activeExam: true})
                .where({id: req.params.id})
                .then(medicalExam=>res.json(medicalExam))
                .catch(err=>res.status(500).send(err))
    }

    

   
   
    return{save, getDesactive, getById, remove, activeExam, getActive}

}
