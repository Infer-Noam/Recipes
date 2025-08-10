import "dotenv/config"; // Loads environment variables
import { DataSource } from "typeorm";
import { Recipe } from "./recipe/recipe.entity";
import { Chef } from "./chef/chef.entity";
import { Ingredient } from "./ingredient/ingredient.entity";
import { RecipeIngredient } from "./recipe/recipe-ingredient/recipeIngredient.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const migrations = process.env.NODE_ENV !== "prod" ? ["migrations/**/*"] : [];

const databasePort =
  process.env.DB_PORT ??
  (() => {
    throw new Error("Missing database port"); // Throws an error if no database port number is configured
  })();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(databasePort),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  entities: [Recipe, Chef, Ingredient, RecipeIngredient],
  migrations,
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
});
