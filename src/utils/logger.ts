import fs from "fs";
import { getDate } from "./date";

/**
 * Log messages to the log file.
 * @param data The data to log to the file.
 * @param rawType The type of message. For example: warning, alert, info, fatal, none.
 * @returns Status.
 */
function log(data: string, rawType: string): boolean {
    try {
        let logData: string;
        let type: string = rawType;
        if (!rawType) type = "none";

        if (type === "none") {
            logData = `${data}\n`;
        } else logData = `${getDate(null, null).time} [${type.toUpperCase()}] ${data}\n`;

        write(logData);
        console.log(logData);
        if (type === "fatal") throw new Error("Fatal log type. Terminated process.");
        return true;
    } catch (error: any) {
        error(error);
        return false;
    }
}

/**
 * Log error messages to the log file.
 * @param data The error to write to the file.
 */
function logError(data: Error): void {
    const logData: string = `${getDate(null, null).time} [ERROR] ${typeof data === "string" ? data : data.stack}\n`;
    write(logData);
    console.error(logData);
}

/**
 * The writing to the log file itself.
 * @param data The text to write to the file.
 */
function write(data: string): void {
    fs.appendFile(`./logs/${getDate(null, null).date}.log`, data, (error) => {
        if (error) console.error(`${getDate(null, null).time} [ERROR] Error appending to log file.`);
    });
}

export { log, logError }
