module.exports = app=>{ 

    const {existsOrError} = app.api.validation

    const waitingList = app.mongoose.model('waitingLists',{
        dataInscricao: {type:Date},
        idUser: Number,
        nome: String,
        dataNasc: Date,
        idClass: Number,
        nomeModalidade: String,

    })

    const saveWaitingList = async(req, res)=>{
        
        const rowsVerifyUser = await waitingList.find({$and:[{idUser:req.params.id}, {idClass: req.query.class}]})
        const rowsVerifyUserClassBody = await waitingList.find({$and:[{idUser: req.body.idUser}, {idClass: req.body.idClass}]})
        const existsUser = await app.db('users').select('id', 'nome', 'dataNasc').first().where({id: req.body.idUser})
        const existsClass = await app.db('classes as c').join('modalities as m', 'm.id', 'c.idModality')
                                .select('c.id', 'm.nomeModalidade', 'c.faixaEtaria').first().where({'c.id': req.body.idClass})
        const ano = 1000*60*60*24*365;
        const idade = parseInt((Date.now() - existsUser.dataNasc)/ano)

        
        try{
            if(existsUser == undefined|| existsClass == undefined){
                throw 'Não existe o id do usuário ou da turma.'
            }
        }catch(msg){
            return res.status(400).send(msg)
        }       
            const idadeMinima = parseInt(existsClass.faixaEtaria.substring(0 , existsClass.faixaEtaria.toUpperCase().indexOf("À")))
            const idadeMaxima = parseInt(existsClass.faixaEtaria.substring(existsClass.faixaEtaria.toUpperCase().indexOf("À")+2, existsClass.faixaEtaria.toUpperCase().indexOf("A")))

        try{
            if(existsClass.faixaEtaria == "Acima de 60 anos" && idade < 60){
                throw 'A idade está fora da faixa etária! Por favor verifique a Modalidade Escolhida!'
            }
            if(!(idade > idadeMinima && idade < idadeMaxima)){
                throw 'A idade está fora da faixa etária! Por favor verifique a Modalidade Escolhida'
            }
        }catch(msg){
            return res.status(400).send(msg)
        }
        const saveWait = new waitingList({idUser: req.body.idUser, nome: existsUser.nome, 
            idClass: req.body.idClass, nomeModalidade: existsClass.nomeModalidade, dataNasc: existsUser.dataNasc,
            dataInscricao: Date.now()})           
            
            try{
                existsOrError(req.body.idUser, 'Por favor, informe o código do usuário.')
                existsOrError(req.body.idClass, 'Por favor, informe o código da turma.')
            }catch (msg){
                return res.status(400).send(msg)
            }
        
        if(req.params.id){
            try{
                existsOrError(rowsVerifyUserClassBody, 'Verifique o id do Usuário ou de Turma.')
            }catch(msg){
                return res.status(400).send(msg)
            }
            await waitingList.findAndUpdate({_id:rowsVerifyUser._id},
                                {$set:{idUser: req.body.idUser, idClass: req.body.idClass}})
                            .then(waitList=> res.json(waitList))
        }else{
            try{
                if(rowsVerifyUserClassBody.length !== 0) throw 'Este usuário já está na lista de espera desta modalidade, por favor verifique no Sistema'
            }catch(msg){
                return res.status(400).send(msg)
            }
            await saveWait.save()
                    .then(waitList=> res.json(waitList))
        }
    }
    const limit = 10
    const getWaitByClass = async(req, res)=>{
        const page = req.query.page || 1
        const count = await waitingList.countDocuments()
        await waitingList.find({idClass: req.params.idClass}).limit(limit).skip(page*limit-limit)
                    .then(waitByClass=>res.json({data: waitByClass, limit: limit, count: count}))
    }

    const countUserWaitingList = async(req, res)=>{
        const dataInscricaoUser = await waitingList.find({idUser: req.body.idUser}, {_id: 0, dataInscricao: 1})
        await waitingList.aggregate([ {$match:{dataInscricao:{$gte:new Date(dataInscricaoUser)}}},
                    {$group:{_id:null, count:{$sum: 1}}},
                    {$project:{_id:0}}])
                    .then(countWait=>res.json(countWait))
    }

    const getWaitingListByUser = async(req, res)=>{
        await waitingList.find({idUser: req.params.idUser}, 
                    {_id:0, dataInscricao: 1, idUser: 1, idClass: 1})
                    .then(listUser=>res.json(listUser))
    }

    const removeWaitList = async(req, res)=>{
        await waitingList.deleteOne({idUser: req.params.idUser, 
                    idClass: req.query.idClass})
                    .then(removeWaitUser=>res.json(removeWaitUser))

    }

    return {saveWaitingList, getWaitByClass, countUserWaitingList, getWaitingListByUser, removeWaitList, waitingList}
}