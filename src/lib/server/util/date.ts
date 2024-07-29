/** Creates a new date that is `h` hours after current timestamp. */
export function expiresAfter(h: number): Date {
	return new Date(Math.ceil(Date.now() + h * 60 * 60 * 1000));
}
