import { Migration } from '@mikro-orm/migrations';

export class Migration20230514215632 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "quiz" add column "name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "quiz" drop column "name";');
  }

}
