const nodemailer = require('nodemailer')
const configMailer = require('../config/mailer/configMailer.json')

module.exports = app=>{
    const sendEmail = (token, email)=>{
        const transporter = nodemailer.createTransport({
            host: configMailer.host,
            port: configMailer.port,
            secure: configMailer.secure,
            auth:{
                user: configMailer.auth.user,
                pass: configMailer.auth.pass
            },
            tls:{
                rejectUnauthorized: configMailer.tls.rejectUnauthorized
            }
        })

        async function run(){
            const sentMailer = await transporter.sendMail({
                from: "noreply@gmail.com",
                to:[email],
                subject: "Nova Senha",
                text: "Utilize este códgio de verificação: " + token
            })
        }
        run()
    }
    return { sendEmail }
}