import { Migration } from '@mikro-orm/migrations';

export class Migration20230518005558 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "question" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "quiz_id" int not null, "question" varchar(255) not null);');

    this.addSql('alter table "question" add constraint "question_quiz_id_foreign" foreign key ("quiz_id") references "quiz" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "question" cascade;');
  }

}
