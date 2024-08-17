import { Resend } from "resend";
import EmailService from "../email";

export class ResendEmailService extends EmailService {
	private resend: Resend;

	constructor(private key: string) {
		super();
		this.resend = new Resend(this.key);
	}

	async send(email: string, subject: string, content: string): Promise<void> {
		const { data, error } = await this.resend.emails.send({
			from: process.env.EMAIL_SENDER,
			to: [email],
			subject,
			html: content
		});

		if (error) {
			return console.error({ error });
		}
	}
}
