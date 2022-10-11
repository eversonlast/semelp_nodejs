/*************Este módulo é para Controle de Idade conforme instruções da secretaria aqui todos os métodos
 * conforme backend
 *****************************/

module.exports = app =>{
    const { existsOrError, existsElementOrError } = app.api.validation
    const { removeWaitList, waitingList } = app.api.waitingList

    /*******Para Salvar o controle de idade 
     * Salva somente um
     * ***********/

    const save = async (req, res)=>{
        const controlAge = {...req.body};
        try {
            existsOrError(controlAge.age, "Por favor, informe o campo idade!");
        } catch (error) {
            return res.status(500).send(error);
        }

        

        if(controlAge.id){
            await app.db('tb_control_age')
                .update(controlAge)
                .where({id: req.params.id})
                .then(_=>res.status(200).send('Alterado com sucesso'))
                .catch(err=>res.status(500).send(err))
        }else {
            const resultControl = await app.db('tb_control_age').count('id').first();
        

            if(parseInt(resultControl.count) > 0){
                return res.status(500).send('Já existe um controle cadastrado, por favor verifique');
            }

            await app.db('tb_control_age')
                .insert(controlAge)
                .then(_=>res.status(200).send('Inserido com sucesso!'))
                .catch(err=>res.status(500).send(err))
        }
    }

    const getControl = async(req, res)=>{
        await app.db('tb_control_age')
            .then(control=>res.json(control))
            //.catch(err=>res.status(500).send(err))
    }

    return {save, getControl} 
}