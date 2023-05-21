import { Migration } from '@mikro-orm/migrations';

export class Migration20230521012747 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "question" add column "answer" varchar(255) not null, add column "option2" varchar(255) not null, add column "option3" varchar(255) not null, add column "option4" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "question" drop column "answer";');
    this.addSql('alter table "question" drop column "option2";');
    this.addSql('alter table "question" drop column "option3";');
    this.addSql('alter table "question" drop column "option4";');
  }

}
