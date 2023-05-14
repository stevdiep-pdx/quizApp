import { Migration } from '@mikro-orm/migrations';

export class Migration20230514212010 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "quiz" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "creator_id" int not null);');

    this.addSql('alter table "quiz" add constraint "quiz_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "quiz" cascade;');
  }

}
