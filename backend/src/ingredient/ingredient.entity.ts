import { Entity, OneToMany, Column } from "typeorm";
import { AuditEntity } from "../audit.entity";
import { RecipeIngredient } from "../recipe/recipe-ingredient/recipeIngredient.entity";

@Entity()
export class Ingredient extends AuditEntity {
  @Column({ type: "varchar", length: 15, unique: true })
  name: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
    {
      onDelete: "CASCADE",
    }
  )
  recipesIngredients: RecipeIngredient[];
}
