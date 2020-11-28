const nodemailer = require('nodemailer')
const { mail } = require('../.env')

module.exports = app=>{
    const sendEmail = (token, email)=>{
        const transporter = nodemailer.createTransport(mail)

        async function run(){
            const sentMailer = await transporter.sendMail({
                from: "apinodesemelp@gmail.com",
                to:[email],
                subject: "Nova Senha",
                text: "Utilize este códgio de verificação: " + token
            })
        }
        run()
    }
    return { sendEmail }
}