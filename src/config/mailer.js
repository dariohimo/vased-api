import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
    },
});

transport.verify((error, success) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Server is ready to take our messages');
    }
})
