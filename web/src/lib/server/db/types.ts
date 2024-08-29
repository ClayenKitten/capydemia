import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Course {
  description: string | null;
  id: Generated<number>;
  title: string;
}

export interface CourseEnrollment {
  courseId: number;
  userId: number;
}

export interface EmailChangeRequest {
  code: string;
  expires: Timestamp;
  newEmail: string;
  userId: number;
}

export interface Lesson {
  content: Json;
  id: Generated<number>;
  moduleId: number;
  order: number;
  title: string;
}

export interface Module {
  courseId: number;
  id: Generated<number>;
  order: number;
  title: string;
}

export interface PasswordRecovery {
  code: string;
  email: string;
  expires: Timestamp;
}

export interface PendingRegistration {
  code: string;
  email: string;
  expires: Timestamp;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

export interface Session {
  expires: Timestamp;
  token: string;
  userId: number;
}

export interface User {
  avatarUrl: string | null;
  email: string;
  firstName: string;
  id: Generated<number>;
  lastName: string;
  passwordHash: string;
  patronim: string | null;
  phone: string | null;
}

export interface DB {
  course: Course;
  courseEnrollment: CourseEnrollment;
  emailChangeRequest: EmailChangeRequest;
  lesson: Lesson;
  module: Module;
  passwordRecovery: PasswordRecovery;
  pendingRegistration: PendingRegistration;
  session: Session;
  user: User;
}
