import { BaseEntity, PrimaryKey, Property } from "@mikro-orm/core";

//https://mikro-orm.io/docs/defining-entities/#using-mikroorms-baseentity-previously-wrappedentity
/** Class to derive other classes from with a unique id */
export class QuizBaseEntity extends BaseEntity<QuizBaseEntity, "id"> {
	/** Unique id */
  @PrimaryKey()
	id!: number;
	
	/** When the entity was made */
	@Property()
	created_at = new Date();
	
	/** When the entity was updated */
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();
}

/** Class to derive other classes from without a unique id */
export class QuizCompositeEntity {
	/** When the entity was made */
	@Property()
	created_at = new Date();
	
	/** When the entity was updated */
	@Property({onUpdate: () => new Date()})
	updated_at = new Date();
}
