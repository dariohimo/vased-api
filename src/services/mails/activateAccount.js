import { transport } from "../../config/mailer.js";

export const sendActivateAccount = async (email, url) => {
    const resp = await transport.sendMail({
        from: '"Activate Account" <bb978e0c37-c60053@inbox.mailtrap.io>',
        to: email,
        subject: "Activa tu cuenta",
        html: `
            <h1>Activate account</h1>
            <p>
                <a href="${url}">Click aquí para activar tu cuenta</a>
            </p>
                `,
    });

    return resp;
};
