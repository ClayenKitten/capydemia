export function addProp<T extends object, K extends PropertyKey, V>(
	obj: T,
	key: K,
	value: V
): asserts obj is T & { [P in K]: V } {
	Object.assign(obj, { [key]: value });
}
