const nodemailer = require('nodemailer')
//const { mail } = require('../.env')

module.exports = app=>{
    const sendEmail = (msg, email, titulo)=>{            
        const transporter = nodemailer.createTransport( {
            host: 'smtp.gmail.com',
             port: 587,
             secure: false,
             auth: {
                 user: 'apinodesemelp@gmail.com',
                 pass:'podereu4021'
             },
             tls: {
                 rejectUnauthorized: false
             }
     })
 
        async function run(){
            const sentMailer = await transporter.sendMail({
                from: "apinodesemelp@gmail.com",
                to:[email],
                subject: titulo,
                text: msg
            })
        }
        run()
    }
    return { sendEmail } 
}
 