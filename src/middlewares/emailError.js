//paquete pare enviar email
export const nodemailer = require('nodemailer');
export function ErrorSend(dato, mensajes, error) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: '18301044@uttt.edu.mx',
            pass: 'shbnudobqxiwegos'
        }
    });
    // mensaje que enviaremos al usuario
    var mensaje = "Error encontrado en: " + mensajes + ", Error despleglado:" + error + " con los datos: " + JSON.stringify(dato, null, 2);

    //validacion de password y email
    var mailOptions = {
        from: '18301044@uttt.edu.mx',
        to: '18301044@uttt.edu.mx',
        subject: 'error en el sistema',
        text: mensaje
    };
    transporter.sendMail(mailOptions, function(error) {});

}