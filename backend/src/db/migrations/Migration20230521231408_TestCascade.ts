import { Migration } from '@mikro-orm/migrations';

export class Migration20230521231408 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "quiz" drop constraint "quiz_creator_id_foreign";');

    this.addSql('alter table "question" drop constraint "question_quiz_id_foreign";');

    this.addSql('alter table "quiz" add constraint "quiz_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update set null on delete cascade;');

    this.addSql('alter table "question" add constraint "question_quiz_id_foreign" foreign key ("quiz_id") references "quiz" ("id") on update set null on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "quiz" drop constraint "quiz_creator_id_foreign";');

    this.addSql('alter table "question" drop constraint "question_quiz_id_foreign";');

    this.addSql('alter table "quiz" add constraint "quiz_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "question" add constraint "question_quiz_id_foreign" foreign key ("quiz_id") references "quiz" ("id") on update cascade;');
  }

}
