import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface PasswordRecovery {
  code: string;
  email: string;
  expires: Timestamp;
}

export interface PendingRegistration {
  code: string;
  email: string;
  expires: Timestamp;
  passwordHash: string;
}

export interface Session {
  expires: Timestamp;
  token: string;
  userId: number;
}

export interface User {
  email: string;
  id: Generated<number>;
  passwordHash: string;
}

export interface DB {
  passwordRecovery: PasswordRecovery;
  pendingRegistration: PendingRegistration;
  session: Session;
  user: User;
}
