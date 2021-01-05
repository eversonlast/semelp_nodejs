module.exports = app=>{ 

    const {existsOrError} = app.api.validation

    const waitingList = app.mongoose.model('waitingLists',{
        dataInscricao: {type: Date, default: Date.now()},
        idUser: Number,
        idClass: Number
    })

    const saveWaitingList = async(req, res)=>{
        
        const saveWait = new waitingList({...req.body})
        const rowsVerifyUser = await waitingList.findOne({$and:[{idUser:req.params.id}, {idClass: req.query.class}]})
        try{
            existsOrError(req.body.idUser, 'Por favor, informe o código do usuário.')
            existsOrError(req.body.idClass, 'Por favor, informe o código da turma.')
        }catch (msg){
            return res.status(400).send(msg)
        }
        await saveWait.save()
                .then(waitList=> res.json(waitList))
    }

    return {saveWaitingList}
}