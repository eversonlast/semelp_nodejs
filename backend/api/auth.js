//const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const signin = async(req, res) => {
        if(!req.body.cpf || !req.body.password){
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({cpf: req.body.cpf })
            .first()
            
            if(!user) return res.status(400).send('Usuário não encontrado!')

            //comparar senhas criptografadas

            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if(!isMatch) return res.status(400).send('CPF ou senha inválidos!')

            const now = Math.floor(Date.now() /1000)

            const payload = {
                id: user.id,
                cpf: user.cpf,
                nome: user.nome,
                tipoUsuario: user.tipoUsuario,
                iat: now,
                exp: now + (60 * 60 * 24 * 3)//o primeiro número é segundos, o segundo é o minutos e o terceiro é um dia, e quarto é quantidade de dias 
            }

            res.json({
                ...payload,
                token: jwt.encode(payload, 'wiayrea57*6565#@21015478820ha#$%%nfcbdkla987464' )
            })
            
    }

    const validateToken = async(req, res) =>{
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, 'wiayrea57*6565#@21015478820ha#$%%nfcbdkla987464')
                if(new Date(token.exp * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch(e){

        }
        res.send(false)
    }
    const validateUser = async(req, res)=>{
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, 'wiayrea57*6565#@21015478820ha#$%%nfcbdkla987464')
                const user = await app.db('users')
                    .where({ cpf: token.cpf })
                    .first()
                return res.send(token.tipoUsuario)
            }
        }catch(e){

        }
    }

    return{ signin, validateToken, validateUser }
}