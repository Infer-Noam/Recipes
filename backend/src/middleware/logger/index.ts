import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";
import errorLogger from "./error-logger.middleware";
import requestLogger from "./request-logger.middleware";

const fsPromises = fs.promises;

const logDir = "/tmp/logs";

const createLogger = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir, { recursive: true });
    }
    await fsPromises.appendFile(path.join(logDir, logName), logItem);
  } catch (err) {
    console.error("Logger error:", err);
  }
};

export { errorLogger, requestLogger, createLogger };
