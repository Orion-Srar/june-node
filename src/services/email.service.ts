import nodemailer from 'nodemailer';
import * as path from "path";
import hbs from 'nodemailer-express-handlebars';

import {EEmailActions} from "../enums";
import {allTemplates} from "../constants";
import {configs} from "../configs";

class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            from: 'No reply',
            service: 'gmail',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_PASSWORD,
            }
        });
        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'src', 'email-templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'src', 'email-templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'src', 'email-templates', 'views'),
            extName: '.hbs',
        }

        this.transporter.use('compile', hbs(hbsOptions));
    }

    public async sendMail(
        email: string,
        emailAction: EEmailActions,
        context: Record<string, string | number> = {}
    ) {
        const {templateName, subject} = allTemplates[emailAction];

        context.frontUrl = configs.FRONT_URL;

        const mailOptions = {
            to: email,
            subject,
            template: templateName,
            context,
        }
        return this.transporter.sendMail(mailOptions)
    };

}

export const emailService = new EmailService();