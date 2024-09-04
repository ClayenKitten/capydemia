import { createLogger as createWinston, format, transports } from "winston";
import { syslog } from "winston/lib/winston/config";

export default function createLogger() {
	return createWinston({
		level: "info",
		levels: syslog.levels,
		format: format.combine(format.timestamp(), format.json()),
		transports: getTransports()
	});
}

function getTransports() {
	return [getConsoleTransport(), ...getFileTransports()];
}

function getConsoleTransport() {
	return new transports.Console({
		format: isDev
			? format.combine(
					format.timestamp(),
					format.colorize(),
					format.printf(({ timestamp, level, message, ...rest }) => {
						if (Object.keys(rest).length === 0) {
							return `[${timestamp}] ${level} ${message}`;
						}
						return `[${timestamp}] ${level} ${message} ${JSON.stringify(rest)}`;
					})
				)
			: format.combine(format.timestamp(), format.json()),
		forceConsole: isDev,
		level: isDev ? "info" : "warn"
	});
}

function getFileTransports() {
	if (isDev) return [];
	return [
		new transports.File({ filename: "error.log", level: "error" }),
		new transports.File({ filename: "combined.log", level: "info" })
	];
}

const isDev = process.env.NODE_ENV === "development";
