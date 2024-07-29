import type Template from "../util/template";

export default abstract class EmailService {
	/** Sends email. */
	public abstract send(
		email: string,
		subject: string,
		content: string
	): Promise<void>;

	/** Sends email template after substitution. */
	public async sendTemplate<CTX extends {}>(
		email: string,
		template: EmailTemplate<CTX>,
		context: CTX
	): Promise<void> {
		let subject = template.subject;
		let content = template.render(context);
		await this.send(email, subject, content);
	}
}

export class EmailTemplate<CTX extends {}> {
	constructor(
		public subject: string,
		private template: Template<CTX>
	) {}

	public render(context: CTX) {
		return this.template.render(context);
	}
}
