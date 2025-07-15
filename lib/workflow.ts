import {resend, Client as QStashClient} from '@upstash/qstash'
import { Client as WorkflowClient } from "@upstash/workflow";
import config from './config';

export const qstashClient = new QStashClient({
    baseUrl:config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken
})

export const workflowClient = new WorkflowClient({ token: config.env.upstash.qstashToken })

export const sendEmail = async({email, subject, message}: {email: string, subject: string, message: string}) => {
    await qstashClient.publishJSON({
    api: {
        name: "email",
        provider: resend({ token: config.env.resendToken }),
    },
    body: {
        from: "JavaScript Journey <onboarding@resend.dev>",
        to: [email],
        subject,
        html: message,
    },
    });
}