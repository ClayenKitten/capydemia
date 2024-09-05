import { writable } from "svelte/store";

/** Creates a toast notification and adds it to the toast store. */
export function createToastNotification(
	/** The type of the toast notification. */
	kind: ToastKind,
	/** The header text of the toast notification. */
	header: string,
	/** The main content text of the toast notification. */
	text: string,
	/**
	 * The time in milliseconds the toast should be visible. If `null`, the toast
	 * will remain until manually removed. If undefined, a default value based on
	 * the `kind` will be used.
	 * */
	timeToLiveMs?: number | null
) {
	const id = nextId++;

	if (timeToLiveMs === undefined) {
		timeToLiveMs = defaultTimeToLive(kind);
	}

	let timeoutId = undefined;
	if (timeToLiveMs !== null) {
		timeoutId = window?.setTimeout(() => {
			removeToast(id);
		}, timeToLiveMs);
	}

	toastState.update(toasts => [
		...toasts,
		{ id, kind, header, text, timeoutId } satisfies ToastData
	]);
}

function defaultTimeToLive(kind: ToastKind): number | null {
	if (kind === "error" || kind === "warning") return null;
	return 5000;
}

export function removeToast(id: number) {
	toastState.update(toasts => toasts.filter(toast => toast.id !== id));
}

export const toastState = writable<ToastData[]>([]);
let nextId = 1;

export interface ToastData {
	id: number;
	kind: ToastKind;
	header: string;
	text: string;
	timeoutId?: number;
}

export type ToastKind = "success" | "error" | "warning";
