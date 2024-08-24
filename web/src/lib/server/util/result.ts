type Result<T, E> = Ok<T> | Err<E>;
export type { Result as default };

type Ok<T> = T extends void ? { ok: true } : { ok: true; value: T };
type Err<E> = E extends void ? { ok: false } : { ok: false; error: E };
