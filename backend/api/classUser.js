module.exports = app=>{
    const { existsOrError } = app.api.validation

    const save = async (req, res)=>{
        const classUser = {... req.body}
        if(req.params.id) classUser.id = req.params.id
        try{
            existsOrError(classUser.idUser, 'Por favor, informe o ID do Usuário.')
            existsOrError(classUser.idClass, 'Por favor, informe o ID da Turma.')
        }catch(msg){
            return res.status(500).send(msg)
        }

        if(classUser.id){
            app.db('classesUsers')
                .update(classUser)
                .where({id: req.params.id})
                .then(_=>res.status(200).send('Alterado com sucesso'))
                .catch(err=>res.status(500).send(err))
        }else{

            
            await app.db('classesUsers')
                .insert(classUser)
                .then(_=>res.status(200).send('Salvo com sucesso'))
                .catch(err=>res.status(500).send(err))
        }
    }
   
   const remove = async(req, res)=>{
       const classUser = {... req.body}
        try{
            existsOrError(classUser.idUser, 'Por favor, informe o ID do Usuário')
            existsOrError(classUser.idClass, 'Por favor, informe o ID da Turma')

            const rowsDeleted = await app.db('classesUsers')
                                        .where({idUser: classUser.idUser ,
                                                idClass: classUser.idClass})
                                        .del()
            
         existsOrError(rowsDeleted, 'O usuário ou a turma não existe!')

         res.status(200).send('Deletado com sucesso')
        }catch(msg){
            return res.status(500).send(msg)
        }
   } 

   const updateDesactive = async(req, res)=>{
       const classUser = {}
       classUser.activeClass = true
       await app.db('classesUsers')
                .update(classUser)
                .where({id: req.params.id})
                .then(_=>res.status(200).send('Usuário ativado com sucesso'))
                .catch(err=>res.status(500).send(err))
   }

   const updateForDesactive = async(req, res)=>{
       const classUserActive = {}
       classUserActive.activeClass = false
       await app.db('classesUsers')
            .update(classUserActive)
            .where({id: req.params.id})
            .then(_=>res.status(200).send('Usuário desativado com sucesso'))
            .catch(err=>res.status(500).send(err))
   }

   const limit = 10
   const getAll = async(req, res)=>{
       const page = req.query.page || 1
       const result = await app.db('classesUsers').count('id').first()
       const count = parseInt(result.count)

       await app.db('classesUsers as clu')
            .limit(limit).offset(page*limit-limit)
            .join('users as u', 'u.id', 'clu.idUser')
            .join('classes as c', 'c.id', 'clu.idClass')
            .join('modalities as m', 'm.id', 'c.idModality')
            .join('sportsCenters as spt', 'spt.id', 'c.idSportCenter')
            .select('clu.id', 'clu.idUser', 'clu.idClass', 'clu.quantidadesDeFalta', 'clu.activeClass',
            'm.nomeModalidade', 'dias', 'horarios', 'faixaEtaria', 'u.nome as nomeAluno', 'spt.nome as centroEsportivo', 
            'm.departamento', 'maxLackMounth as maximoFaltasMes')
            .then(classUser=>res.json({data: classUser, count, limit}))
            .catch(err=>res.status(500).send(err))
   }

   const getByIDClassActive = async(req, res)=>{
        const page = req.query.page || 1
        const idClass = req.params.id
        const result = await app.db('classesUsers').count('id').first().where({idClass: idClass}).andWhere({activeClass: true})
        const id = parseInt(idClass)
        const count = parseInt(result.count)
        await app.db('classesUsers as turma')
                    .join('users as u', 'u.id', 'turma.idUser')
                    .select('u.nome', 'idUser', 'quantidadesDeFalta', 'activeClass')
                    .where({idClass: id})
                    .andWhere({activeClass: true})
                    .limit(limit).offset(page*limit-limit)
                    .then(classUser=>res.json({data: classUser, count, limit}))
                    .catch(err=>res.status(500).send(err))
   }
   
   const numberOfStudentsPerClass = async(req, res)=>{
        await app.db('classesUsers as uc')
                .count('c.id')
                .join('classes as c', 'c.idSportCenter', parseInt(req.params.idSportCenter))
                .first()
                .where({'uc.idClass': parseInt(req.params.idClass)})
                .andWhere({activeClass: true})
                .andWhere({'c.id': parseInt(req.params.idClass)})
                .then(resultStudent=>res.json(parseInt(resultStudent.count)))
                .catch(err=>res.status(500).send(err))
   }
   const countUser =  async(req, res)=>{
       await app.db('classesUsers')
                .count('id')
                .where({idClass: req.params.idClass})
                .then(resultCount=> res.json(parseInt(resultCount[0].count)))
   }

   const verifyNumberStudents = async(req, res)=>{
       await app.db('classes')
                .where({id: req.params.idClass})
                .select('studentsNumber')
                .then(resultNumberClass=> res.json(parseInt(resultNumberClass[0].studentsNumber)))
   }

   const getByIdClassDesactive = async(req, res)=>{
        const page = req.query.page || 1
        const idClass = req.params.id
        const result = await app.db('classesUsers').count('id').first()
                .where({idClass: idClass})
                .andWhere({activeClass: false, activeClass: null})
        const count = parseInt(result.count)
        await app.db('classesUsers as turma')
                .join('users as u', 'u.id', 'turma.idUser')
                .select('u.nome', 'idUser', 'activeClass')
                .where({idClass: idClass})
                .andWhere({activeClass: false, activeClass: null})
                .limit(limit).offset(page*limit-limit)
                .then(classUserDesactive=>res.json({data:classUserDesactive, count, limit}))
                .catch(err=>res.status(500).send(err))

   } 

   const getAllClassDesactive = async(req, res)=>{
    const page = req.query.page || 1
    const idClass = req.params.id
    const result = await app.db('classesUsers').count('id').first()
            .orWhere({activeClass: false, activeClass: null, activeClass: 'f'})
    const count = parseInt(result.count)
    await app.db('classesUsers as turma')
            .join('users as u', 'u.id', 'turma.idUser')
            .join('classes as c', 'c.id', 'turma.idClass')
            .join('modalities as m', 'm.id', 'c.idModality')
            .join('sportsCenters as spt', 'spt.id', 'c.idSportCenter')
            .select('u.nome as nomeAluno', 'idUser', 'activeClass', 'turma.id', 'dias',
                    'horarios', 'm.nomeModalidade', 'spt.nome as centroEsportivo', 'm.departamento',  'maxLackMounth as maximoFaltasMes')
            .orWhere({activeClass: false, activeClass: null, activeClass: 'f'})
            .limit(limit).offset(page*limit-limit)
            .then(classUserDesactive=>res.json({data:classUserDesactive, count, limit}))
            .catch(err=>res.status(500).send(err))

} 

    const getAllClassActive = async(req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('classesUsers').count('id').first()
                                .where({activeClass: true})
        const count = parseInt(result.count)
        await app.db('classesUsers as turma')
            .join('users as u', 'u.id', 'turma.idUser')
            .join('classes as c', 'c.id', 'turma.idClass')
            .join('modalities as m', 'm.id', 'c.idModality')
            .join('sportsCenters as spt', 'spt.id', 'c.idSportCenter')
            .select('turma.id', 'u.nome as nomeAluno', 'idUser', 'turma.quantidadesDeFalta', 'dias', 'horarios',
                'm.nomeModalidade', 'spt.nome as centroEsportivo', 'm.departamento', 'maxLackMounth as maximoFaltasMes')
            .where({activeClass: true})
            .limit(limit).offset(page*limit-limit)
            .then(classUserActive=>res.json({data: classUserActive, count, limit}))
            .catch(err=>res.status(500).send(err))
    }

   const getByIdUser = async(req, res)=>{
       const idUser = req.params.id
       const id = parseInt(idUser)
       await app.db('classesUsers as turma')        
                    .join('users as u', 'u.id','=', 'turma.idUser')
                    .join('classes as c', 'c.id','=', 'turma.idClass')
                    .join('modalities as m', 'm.id','=', 'c.idModality')
                    .join('sportsCenters as spt', 'spt.id','=', 'c.idSportCenter')
                    .select('u.nome as nome', 'nomeModalidade as NomeDaModalidade', 'spt.nome as local',
                    'dias', 'horarios', 'turma.id')
                    .where({idUser: id})
                    .andWhere({activeClass: true})
                    .then(userClass=>res.json(userClass))
                    .catch(err=>res.status(500).send(err))
   }

   const lackByMounth =  app.mongoose.model('lackByMounth',{
       idUserClass: Number,
       ano: Number,
       mes: String,
       dias: Array
   })

   const saveLack = async (req, res)=>{
       var lack = new lackByMounth({... req.body})
       const verifyStudent = await lackByMounth.findOne({$and:[{idUser: req.params.id}, {ano: req.query.ano}, {mes: req.query.mes}]})
       const rowsRegisterClassUser = await app.db('classesUsers').count('id').first().where({id:req.body.idUserClass})
       const countRegister = parseInt(rowsRegisterClassUser.count)
       try{
            existsOrError(req.body.mes, "Por favor, informe o mês.")
            existsOrError(req.body.ano, "Pot favor, informe o ano.")
            existsOrError(req.body.idUserClass, "Por favor, informe a matrícula do aluno.")
       }catch(msg){
            return res.status(400).send(msg)
       }
       
       if(req.params.id){
           try{
            existsOrError(verifyStudent, "Ainda não existe registro destes dados.")
           }catch (msg){
            return res.status(400).send(msg)
           }
            await lackByMounth.findOneAndUpdate({_id:verifyStudent._id}, 
                                            {$set:{mes: req.body.mes, ano:req.body.ano, dias:req.body.dias}})
                .then(lack=>res.json(lack))
       }else{
           if(countRegister == 0) return res.status(400).send("A matrícula não existe")
           await lack.save()
           .then(lack=>res.json(lack))
       }
   }

   const getByIdUserLack = async(req, res)=>{
        var idUserClass = req.params.id
        await lackByMounth.find({idUserClass: idUserClass})
            .then(userLacks=>res.json(userLacks))
   }

   

    return { save, remove, getAll, getByIDClassActive, getByIdUser, saveLack, getByIdUserLack, getByIdClassDesactive, numberOfStudentsPerClass, getAllClassDesactive, 
        updateDesactive, getAllClassActive, updateForDesactive, countUser, verifyNumberStudents}
}



// select u.nome as "Aluno(a)","nomeModalidade", dias, horarios, spt.nome as local from classes
//                         inner join "sportsCenters" as spt on spt.id = (select "idSportCenter" from classes where classes.id = (select "idClass" from "classesUsers" where id=${req.params.id}))                                                                                
//                         inner join modalities as m on m.id = (select "idModality" from classes where classes.id = (select "idClass" from "classesUsers" where id=${req.params.id}))
//                         inner join users as u on u.id = (select "idUser" from "classesUsers" where id = ${id})
//                         where classes.id = (select "idClass" from "classesUsers" where id = ${id})

// `select u.nome, "nomeModalidade" as "Nome da Modalidade", spt.nome as local, dias, horarios as "horários" from "classesUsers" as turma                                            
//                         inner join users as u on u.id = turma."idUser"  
//                         inner join classes as c on c.id = turma."idClass"
//                         inner join modalities as m on m.id = c."idModality"
//                         inner join                                 
//                         "sportsCenters" as spt on spt.id = c."idSportCenter"
//                         where "idUser" = ${idUser}`

// select count(*) from "classesUsers" 
// as uc
// inner join classes as c on c."idSportCenter" = 9
// where uc."idClass" =23 and "activeClass" = true and c.id= 23;
