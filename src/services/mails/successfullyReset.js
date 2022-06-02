import { transport } from "../../config/mailer.js";

export const sendSuccessfullyReset = async (email) => {
    const resp = await transport.sendMail({
        from: '"Recovery Password" <bb978e0c37-c60053@inbox.mailtrap.io>',
        to: email,
        subject: "Recovery Password Successfully",
        html: `
            <h1>Recovery Password</h1>
            <p>
                Tu contraseña ha sido reestablecida con éxito.
            </p>`,
    });
}