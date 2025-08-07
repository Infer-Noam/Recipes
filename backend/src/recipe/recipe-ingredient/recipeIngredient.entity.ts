import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { AuditEntity } from "../../audit.entity";
import { Recipe } from "../../recipe/recipe.entity";
import { Ingredient } from "../../ingredient/ingredient.entity";
import { MeasurementUnit } from "@shared/enums/measurement-unit.enum";

@Entity()
export class RecipeIngredient extends AuditEntity {
  @Column({ type: "integer" })
  amount: number;

  @Column({ type: "enum", enum: MeasurementUnit })
  measurementUnit: MeasurementUnit;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    cascade: ["insert", "update", "soft-remove"],
    orphanedRowAction: "soft-delete",
  })
  @JoinColumn({ name: "recipe_uuid" })
  recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipesIngredients)
  @JoinColumn({ name: "ingredient_uuid" })
  ingredient: Ingredient;
}
