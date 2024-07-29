export default interface PasswordService {
	hash(password: string, salt?: string): Promise<string>;
	verify(password: string, hash: string): Promise<boolean>;
}
