import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";

//https://mikro-orm.io/docs/defining-entities/#using-mikroorms-baseentity-previously-wrappedentity
export class QuizBaseEntity extends BaseEntity<QuizBaseEntity, "id"> {
  @PrimaryKey()
	id!: number;
	
	@Property()
	created_at = new Date();
	
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();
}

export class QuizCompositeEntity {
	@Property()
	created_at = new Date();
	
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();
}
