import "module-alias/register";
import "dotenv/config"; // Loads environment variables
import app from "./app";
import { AppDataSource } from "./data-source";

const serverPort =
  process.env.SERVER_PORT ??
  (() => {
    throw new Error("Missing server port"); // Throws an error if no server port number is configured
  })();

const databasePort =
  process.env.DB_PORT ??
  (() => {
    throw new Error("Missing database port"); // Throws an error if no database port number is configured
  })();

const main = async () => {
  console.log(`Running in ${process.env.NODE_ENV} enviroment`);

  AppDataSource.initialize()
    .then(() => {
      console.log(`Data Source running on port ${databasePort}`);

      app.listen(serverPort, () =>
        console.log(`Server running on port ${serverPort}`)
      );
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
};

main();
