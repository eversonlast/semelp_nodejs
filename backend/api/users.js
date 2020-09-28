const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const { existsOrError, notExistsOrError, equalsOrError, typeUser, TestaCPF } = app.api.validation

    const encrypPassword =  password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const save = async(req, res)=>{
        const user = { ...req.body }

        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.tipoUsuario = 'user'
        if(!req.user || !req.tipoUsuario === 'admin') user.tipoUsuario = 'user'

        try{    
            existsOrError(user.nome, 'Nome não informado')
            existsOrError(user.mae, 'O nome da mãe não informado')
            existsOrError(user.tipoDocumento, 'O tipo do documento não informado')
            existsOrError(user.documento, 'O documento não informado')
            existsOrError(user.cpf, 'O cpf não informado')
            existsOrError(user.email, 'O email não informado')
            existsOrError(user.dataNasc, 'A data de nascimento não informado')
            existsOrError(user.nomeLogradouro, 'O nome do Logradouro não foi informado')
            existsOrError(user.bairro, 'O bairro não foi informado')
            existsOrError(user.cidade, 'A cidade não foi informada')
            existsOrError(user.cep, 'O cep não foi informado')
            existsOrError(user.typePhone,'Por favor, selecione o tipo de telefone')
            existsOrError(user.ddd, 'O ddd não foi informado')
            existsOrError(user.numeroTelefone, 'Pelo menos um telefone tem que informar')
           
            if(!user.id){
                existsOrError(user.password, 'A senha não informado')
                existsOrError(user.confirmPassword, 'A confirmação não informado')
            }
            if(!user.pai){
                user.pai = 'Não consta'
            }
            
            typeUser(user.tipoUsuario, 'Tipo de Usuário inválido!')
           
            if(!TestaCPF(user.cpf)){
               return notExistsOrError(user.cpf, 'CPF Inválido')
            }

            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ cpf: user.cpf }).first()
            if(!user.id){
                notExistsOrError(userFromDB, 'Usuário já cadastro')
            }

        }catch(msg){
            return res.status(400).send(msg)
        }

        user.password = encrypPassword(req.body.password)
        delete user.confirmPassword

        if(user.id){
            const UpdateUser = await app.db('users')
                .update({nome: user.nome, mae: user.mae, pai:user.pai, tipoDocumento:user.tipoDocumento,
                    documento: user.documento, cpf: user.cpf, password:user.password, email: user.email, 
                    naturalidade: user.naturalidade, dataNasc: user.dataNasc, tipoUsuario: user.tipoUsuario, 
                    estado: user.estado, escolaTrabalho: user.escolaTrabalho})
                .where({id: user.id})
            
            const idAddress = await app.db('addresses')
                    .select('id')
                    .where({idUserAddress: user.id})
            const idTransformAddress = await parseInt(idAddress[0].id)

            const UpdateAddress = await app.db('addresses')
                    .update({nomeLogradouro: user.nomeLogradouro,
                        numeroCasa: user.numeroCasa, bairro: user.bairro, cidade: user.cidade,
                        estadoEndereco: user.estadoEndereco, cep: user.cep})
                    .where({id: idTransformAddress})
                    
            
            const idTelephone = await app.db('telephones')
                    .select('id')
                    .where({idUserTelephone: user.id})
            const idTransformTelephone = await parseInt(idTelephone[0].id)

            const UpdateTelephone = await app.db('telephones')
                    .update({ddd: user.ddd, numeroTelefone: user.numeroTelefone, typePhone: user.typePhone})
                    .where({id: idTransformTelephone})
                    .then(_=>res.status(204).send())

            const result = await app.db('telephones').count('id')
                        .where({idUserTelephone: user.id})
                        .first()
            const count = parseInt(result.count)
            

            if(count >= 2){
                const idTransformTelephone1 = await parseInt(idTelephone[1].id)
                const UpdateTelephone1 = await app.db('telephones')
                    .update({ddd: user.ddd1, numeroTelefone: user.numeroTelefone1, typePhone: user.typePhone1})
                    .where({id: idTransformTelephone1})
                if(count == 3){
                    const idTransformTelephone2 = await parseInt(idTelephone[2].id)
                    const UpdateTelephone2 = await app.db('telephones')
                        .update({ddd: user.ddd2, numeroTelefone: user.numeroTelefone2, typePhone: user.typePhone2})
                        .where({id: idTransformTelephone2})
                    return {UpdateTelephone2}
                }
                return {UpdateTelephone1}
            }else{
                if(user.ddd1){
                    const insertTelephone1 =  await app.db('telephones')
                        .insert({ddd:user.ddd1, numeroTelefone: user.numeroTelefone1, 
                            idUserTelephone: user.id, typePhone: user.typePhone1})
                            if(user.ddd2){
                                const insertTelephone2 =  await app.db('telephones')
                                    .insert({ddd:user.ddd2, numeroTelefone: user.numeroTelefone2, 
                                        idUserTelephone: user.id, typePhone: user.typePhone2})
                                return {insertTelephone2}
                            }
                    return {insertTelephone1}
                }
            }

            return{ UpdateUser, UpdateAddress, UpdateTelephone }

        }else{
        
                const insertUser = await app.db('users')
                    .insert({nome: user.nome, mae: user.mae, pai:user.pai, tipoDocumento:user.tipoDocumento,
                        documento: user.documento, cpf: user.cpf, password:user.password, email: user.email, 
                        naturalidade: user.naturalidade, dataNasc: user.dataNasc, tipoUsuario: user.tipoUsuario, 
                        estado: user.estado, escolaTrabalho: user.escolaTrabalho})
                        
                const idUser = await app.db('users')
                        .select('id')
                        .where({cpf: user.cpf}).first()
                const idTransform = await parseInt(idUser.id)
                        

                const insertAddress = await app.db('addresses')
                    .insert({nomeLogradouro: user.nomeLogradouro,
                        numeroCasa: user.numeroCasa, bairro: user.bairro, cidade: user.cidade,
                        estadoEndereco: user.estadoEndereco, idUserAddress: idTransform, 
                        cep: user.cep})
                
                const insertTelephone = await app.db('telephones')
                    .insert({ddd: user.ddd, numeroTelefone: user.numeroTelefone, 
                        idUserTelephone: idTransform, typePhone: user.typePhone})
                    .then(_=>res.status(204).send())
                
                if(user.ddd1){
                    const insertTelephone1 =  await app.db('telephones')
                        .insert({ddd:user.ddd1, numeroTelefone: user.numeroTelefone1, 
                            idUserTelephone: idTransform, typePhone: user.typePhone1})
                            if(user.ddd2){
                                const insertTelephone2 =  await app.db('telephones')
                                    .insert({ddd:user.ddd2, numeroTelefone: user.numeroTelefone2, 
                                        idUserTelephone: idTransform, typePhone: user.typePhone2})
                                return {insertTelephone2}
                            }
                    return {insertTelephone1}
                }
            return {insertUser, insertAddress, insertTelephone }
        }
    }
    const limit = 10
    const get = async (req, res)=>{
        const page = req.query.page || 1
        const result = await app.db('users').count('id').first()
        const count = parseInt(result.count)
        app.db.raw(`select  u.id, nome, mae, TO_CHAR("dataNasc",'DD/MM/YYYY') as "dataNasc", "tipoDocumento", documento, cpf, 
                             bairro
                    from addresses a, users u 
                    where u.id =  "idUserAddress"
                    limit ${limit} offset ${page*limit-limit}`)
            .then(users=>res.json({data: users.rows, count, limit}))
            .catch(err=>res.status(500).send(err))
    }

    const getById = async(req, res)=>{
        const ResultgetById = await app.db.raw(`select  u.id, nome, cpf, mae, pai, "dataNasc", "tipoDocumento", documento, 
                            "nomeLogradouro", "numeroCasa", bairro, "escolaTrabalho", naturalidade, estado, email,
                            ddd, "numeroTelefone", "typePhone", "estadoEndereco", cep, cidade, t.id as idtel
                    from addresses a, telephones t, users u 
                    where "idUserAddress" = ? and u.id = ? and "idUserTelephone"= ?;`, [req.params.id, req.params.id, req.params.id])
                    .then(users=>{
                       
                        if(users.rows.length === 3){
                            res.json({"id": users.rows[0].id, "nome":users.rows[0].nome, "pai": users.rows[0].pai, "cpf": users.rows[0].cpf, "mae": users.rows[0].mae,
                                "dataNasc": users.rows[0].dataNasc, "estado": users.rows[0].estado, "naturalidade": users.rows[0].naturalidade, "tipoDocumento": users.rows[0].tipoDocumento, "documento": users.rows[0].documento,
                                "email": users.rows[0].email, "nomeLogradouro": users.rows[0].nomeLogradouro, "numeroCasa": users.rows[0].numeroCasa,
                                "bairro": users.rows[0].bairro,"cidade": users.rows[0].cidade, "estadoEndereco": users.rows[0].estadoEndereco, "cep": users.rows[0].cep,  "escolaTrabalho": users.rows[0].escolaTrabalho,
                               
                                    "ddd": users.rows[0].ddd, "numeroTelefone": users.rows[0].numeroTelefone, "typePhone": users.rows[0].typePhone, "idTel": users.rows[0].idtel, 
                                    "ddd1": users.rows[1].ddd, "numeroTelefone1": users.rows[1].numeroTelefone,"typePhone1": users.rows[1].typePhone, "idTel1": users.rows[1].idtel,
                                    "ddd2": users.rows[2].ddd, "numeroTelefone2": users.rows[2].numeroTelefone, "typePhone2": users.rows[2].typePhone, "idTel2": users.rows[2].idtel
                        })                            
                        }else if(users.rows.length ===2){
                            res.json({"id": users.rows[0].id, "nome":users.rows[0].nome,"pai": users.rows[0].pai, "cpf": users.rows[0].cpf, "mae": users.rows[0].mae,
                            "dataNasc": users.rows[0].dataNasc, "estado": users.rows[0].estado, "naturalidade": users.rows[0].naturalidade, "tipoDocumento": users.rows[0].tipoDocumento, "documento": users.rows[0].documento,
                            "email": users.rows[0].email, "nomeLogradouro": users.rows[0].nomeLogradouro, "numeroCasa": users.rows[0].numeroCasa,
                            "bairro": users.rows[0].bairro,"cidade": users.rows[0].cidade, "estadoEndereco": users.rows[0].estadoEndereco, "cep": users.rows[0].cep,  "escolaTrabalho": users.rows[0].escolaTrabalho,
                            
                                "ddd": users.rows[0].ddd, "numeroTelefone": users.rows[0].numeroTelefone, "typePhone": users.rows[0].typePhone, "idTel": users.rows[0].idtel,
                                "ddd1": users.rows[1].ddd, "numeroTelefone1": users.rows[1].numeroTelefone,"typePhone1": users.rows[1].typePhone, "idTel1": users.rows[1].idtel
                        })   
                        }else if(users.rows.length === 1){
                            res.json({"id": users.rows[0].id, "nome":users.rows[0].nome, "mae": users.rows[0].mae,"pai": users.rows[0].pai, "cpf": users.rows[0].cpf,
                                "dataNasc": users.rows[0].dataNasc, "estado": users.rows[0].estado, "naturalidade": users.rows[0].naturalidade, "tipoDocumento": users.rows[0].tipoDocumento, "documento": users.rows[0].documento,
                                "email": users.rows[0].email, "nomeLogradouro": users.rows[0].nomeLogradouro, "numeroCasa": users.rows[0].numeroCasa,
                                "bairro": users.rows[0].bairro,"cidade": users.rows[0].cidade, "estadoEndereco": users.rows[0].estadoEndereco, "cep": users.rows[0].cep,  "escolaTrabalho": users.rows[0].escolaTrabalho,
                               
                                    "ddd": users.rows[0].ddd, "numeroTelefone": users.rows[0].numeroTelefone, "typePhone": users.rows[0].typePhone, "idTel": users.rows[0].idtel
                            })
                        }
                    })               
    }
    const remove =  async(req, res)=>{
        try{
            const rowsDeleted = await app.db('users')
                .where({id: req.params.id}).del()
            try{
                existsOrError(rowsDeleted,'Usuário não existe')
            }catch(msg){
                return res.status(400).send(msg)
            }
            return res.status(204).send('Usuário deletado com sucesso')
        }catch(msg){
            res.status(500).send(msg)
        }
    }
    return {save, get, getById, remove }
}