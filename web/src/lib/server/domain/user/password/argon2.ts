import type PasswordService from ".";
import argon2 from "argon2";

export default class Argon2PasswordService implements PasswordService {
	async hash(password: string): Promise<string> {
		return await argon2.hash(password);
	}

	async verify(password: string, hash: string): Promise<boolean> {
		return await argon2.verify(hash, password);
	}
}
