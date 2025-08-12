import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  OneToMany,
  Check,
} from "typeorm";
import { AuditEntity } from "../audit.entity";
import { Chef } from "../chef/chef.entity";
import { RecipeIngredient } from "../recipe/recipe-ingredient/recipeIngredient.entity";
import { RecipeStep } from "./recipe-step/recipeStep.entity";

@Entity()
@Check(`"name" != '' AND "image_url" != ''`)
export class Recipe extends AuditEntity {
  @Column({ type: "varchar", length: 20 })
  name: string;

  @ManyToOne(() => Chef, (Chef) => Chef.recipes)
  @JoinColumn({
    name: "chef_uuid",
  })
  chef: Chef;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  imageUrl: string;

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.recipe,
    { cascade: true }
  )
  ingredients: RecipeIngredient[];

  @OneToMany(() => RecipeStep, (recipeStep) => recipeStep.recipe, {
    cascade: true,
  })
  steps: RecipeStep[];
}
