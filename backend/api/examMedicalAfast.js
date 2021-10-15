const knexfile = require('../knexfile');

module.exports = app =>{
	const {existsOrError} = app.api.validation;
	const knex = require('knex')(knexfile);

	const save = async(req, res)=>{
		const examMedicalAfast = {...req.body};

		if(req.params.id) examMedicalAfast.id = req.params.id;
		
		var data = new Date(examMedicalAfast.dayAtest);
		if(examMedicalAfast.quantidadesDeDias > 90){
			try{
				throw "Quantidade de Dias não permitida para atestado!"
			}catch(e){
				return res.status(400).send(e);
			}
		}else{
			data.setDate(data.getDate() + (parseInt(examMedicalAfast.quantidadesDeDias)));
			examMedicalAfast.dayVencimento = data;
		}
		
		try{
			existsOrError(examMedicalAfast.dayAtest, "Por favor, informe a data do Atestado.");
			existsOrError(examMedicalAfast.quantidadesDeDias, "Por favor, informe a quantidades de dias do Atestado");
			existsOrError(examMedicalAfast.pathMedicalExamAfast, "Por favor, informe o caminho do arquivo");
			existsOrError(examMedicalAfast.idUser, "Não informou id do usuário")
		} catch(e){
			return res.status(400).send(e)
		}

		if(examMedicalAfast.id){
			await app.db('examMedicalAfast')
				.update(examMedicalAfast)
				.where({id: examMedicalAfast.id})
				.then(_=>res.status(200).send({success: "Atestado Alterado com sucesso"}))
				.catch(err=>res.status(500).send(err))
		}else{

			await app.db('examMedicalAfast')
				.insert(examMedicalAfast)
				.then(_=>res.status(200).send({success: "Atestado inserido com sucess"}))
				.catch(err=>res.status(500).send(err))

		}	
	}

	const limit = 10;
	const listAllExamAfast = async(req, res) =>{
		const page = req.query.page || 1;
		const result = await app.db('examMedicalAfast').count('id').where({activeExam: null}).first();
		const count = parseInt(result.count);

		await app.db('examMedicalAfast as ema')
			.join('users as u', 'u.id', 'ema.idUser')
			.select('ema.*', 'u.nome')
			.limit(limit).offset(page*limit-limit)
			.then(examAfastado=>res.json({data: examAfastado, count, limit}))
			.catch(err=>res.status(500).send(err))
	}

	const getAtestadoByIdUser = async(req, res)=>{
		const page = req.query.page || 1;
		const result = await app.db('examMedicalAfast').count('id').where({activeExam: null}).andWhere({idUser: req.params.idUser}).first()
		const count = parseInt(result.count)

		await app.db('examMedicalAfast as ema')
			.join('users as u', 'u.id', 'ema.idUser')
			.select('ema.*', 'u.nome')
			.where({activeExam: null})
			.andWhere({idUser: req.params.idUser})
			.limit(limit).offset(page*limit-limit)
			.then(examAfastado=>res.json({data: examAfastado, count, limit}))
			.catch(err=>res.status(500).send(err))
	}


	const getAtestadoByDate = async(req, res)=>{
		const page = req.query.page || 1;
		const result = await app.db('examMedicalAfast').count('id')
			.where({activeExam: null})
			.andWhere({idUser: req.params.idUserDate})
			.andWhere(knex.raw(`"dayVencimento" < now()`))
			.andWhere(knex.raw(`"dayVencimento" >= (SELECT DATE_TRUNC('MONTH', NOW())::DATE)`))
			.first()

		var count = result.count
		res.json({count})
	}


	return{save, listAllExamAfast, getAtestadoByIdUser, getAtestadoByDate}
}
