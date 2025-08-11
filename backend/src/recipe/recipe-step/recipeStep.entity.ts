import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { AuditEntity } from "../../audit.entity";
import { Recipe } from "../recipe.entity";

@Entity()
export class RecipeStep extends AuditEntity {
  @Column({ type: "integer" })
  placement: number;

  @Column({ type: "varchar", length: 20 })
  text: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps, {
    cascade: ["insert", "update", "soft-remove"],
    orphanedRowAction: "soft-delete",
  })
  @JoinColumn({ name: "recipe_uuid" })
  recipe: Recipe;
}
