module.exports = app=>{ 

    const {existsOrError} = app.api.validation

    const waitingList = app.mongoose.model('waitingLists',{
        dataInscricao: {type:Date},
        idUser: Number,
        idClass: Number
    })

    const saveWaitingList = async(req, res)=>{
        
        const saveWait = new waitingList({idUser: req.body.User, idClass: req.body.idClass, dataInscricao: Date.now()})
        const rowsVerifyUser = await waitingList.findOne({$and:[{idUser:req.params.id}, {idClass: req.query.class}]})
        const existsUser = await app.db('users').count('id').first().where({id: req.body.idUser})
        const existsClass = await app.db('classes').count('id').first().where({id: req.body.idClass})
        const amountUser = parseInt(existsUser.count)
        const amountClass = parseInt(existsClass.count)

        try{
            existsOrError(req.body.idUser, 'Por favor, informe o código do usuário.')
            existsOrError(req.body.idClass, 'Por favor, informe o código da turma.')
            try{
                if(amountUser == 0 || amountClass == 0){
                    throw 'Não existe o id do usuário ou da turma.'
                }
            }catch(msg){
                return res.status(400).send(msg)
            }
        }catch (msg){
            return res.status(400).send(msg)
        }
        
        if(req.params.id){
            try{
                existsOrError(rowsVerifyUser, 'Verifique o id do Usuário e da Turma.')
            }catch(msg){
                return res.status(400).send(msg)
            }
            await waitingList.findOneAndUpdate({_id:rowsVerifyUser._id},
                                {$set:{idUser: req.body.idUser, idClass: req.body.idClass}})
                            .then(waitList=> res.json(waitList))
        }else{
            await saveWait.save()
                    .then(waitList=> res.json(waitList))
        }
    }

    const getWaitByClass = async(req, res)=>{
        await waitingList.find({idClass: req.params.idClass})
                    .then(waitByClass=>res.json(waitByClass))
    }

    const countUserWaitingList = async(req, res)=>{
        const dataInscricaoUser = await waitingList.findOne({idUser: req.body.idUser}, {_id: 0, dataInscricao: 1})
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
        await waitingList.remove({idUser: req.params.idUser, 
                    idClass: req.query.idClass})
                    .then(removeWaitUser=>res.json(removeWaitUser))

    }

    return {saveWaitingList, getWaitByClass, countUserWaitingList, getWaitingListByUser, removeWaitList}
}