import { transport } from "../../config/mailer.js";

export const sendRecoveryPassword = async (email, url) => {
    const resp = await transport.sendMail({
        from: '"Recovery Password" <bb978e0c37-c60053@inbox.mailtrap.io>',
        to: email,
        subject: "Recovery Password",
        html: `
            <h1>Recovery Password</h1>
            <p>
                <a href="${url}">Click aquí para reestablecer contraseña</a>
            </p>
                `,
    });

    return resp;
};
