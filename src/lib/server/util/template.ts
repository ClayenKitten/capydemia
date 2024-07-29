import handlebars, { type TemplateDelegate } from "handlebars";

/** Handlebars template with caching and typing. */
export default class Template<CTX extends {} = {}> {
	constructor(
		private template: string,
		private runtimeOptions?: RuntimeOptions,
		private compileOptions?: CompileOptions
	) {}

	private compiled: TemplateDelegate | null = null;

	public render(context: CTX): string {
		if (this.compiled === null) {
			this.compiled = handlebars.compile(this.template, this.compileOptions);
		}
		return this.compiled({ ...context, env: process.env }, this.runtimeOptions);
	}
}

export type CompileOptions = NonNullable<
	Parameters<typeof handlebars.compile>[1]
>;
export type RuntimeOptions = NonNullable<Parameters<TemplateDelegate>[1]>;
