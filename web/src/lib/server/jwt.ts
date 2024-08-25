import * as jose from "jose";
import type { ZodSchema } from "zod";

/** Service for generating and validating Json Web Tokens. */
export class JwtService {
	constructor(private key: jose.KeyLike) {}

	public async sign(
		payload: jose.JWTPayload,
		opts?: SignOptions
	): Promise<string> {
		let builder = new jose.SignJWT(payload);
		builder = applySignOptions(builder, opts);
		return await builder.sign(this.key);
	}

	public async verify<T>(
		token: string | Uint8Array,
		opts: VerifyOptions<T>
	): Promise<T> {
		let { payload } = await jose.jwtVerify(token, this.key, opts);
		return opts.schema.parse(payload);
	}
}

export type SignOptions = Partial<{
	audience: string | string[];
	expiration: string | Date | number;
	/** If set to true, current timestamp used. */
	issuedAt: string | Date | number | true;
	issuer: string;
	jti: string;
	notBefore: string | Date | number;
	subject: string;
}>;

function applySignOptions(
	builder: jose.SignJWT,
	opts?: SignOptions
): jose.SignJWT {
	if (opts === undefined) return builder;
	let { audience, expiration, issuedAt, issuer, jti, notBefore, subject } =
		opts;

	if (audience !== undefined) builder = builder.setAudience(audience);
	if (expiration !== undefined) builder = builder.setExpirationTime(expiration);
	if (issuer !== undefined) builder = builder.setIssuer(issuer);
	if (jti !== undefined) builder = builder.setJti(jti);
	if (notBefore !== undefined) builder = builder.setNotBefore(notBefore);
	if (subject !== undefined) builder = builder.setSubject(subject);
	if (issuedAt !== undefined) {
		if (issuedAt === true) builder = builder.setIssuedAt();
		else builder = builder.setIssuedAt(issuedAt);
	}

	return builder;
}

export type VerifyOptions<T> = jose.JWTVerifyOptions & {
	schema: ZodSchema<T>;
};
