import { Migration } from '@mikro-orm/migrations';

export class Migration20230610200001 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "leaderboard" ("player_id" int not null, "time" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "score" int not null, constraint "leaderboard_pkey" primary key ("player_id", "time"));');

    this.addSql('alter table "leaderboard" add constraint "leaderboard_player_id_foreign" foreign key ("player_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users" drop column "deleted_at";');

    this.addSql('alter table "quiz" drop column "deleted_at";');

    this.addSql('alter table "question" drop column "deleted_at";');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "leaderboard" cascade;');

    this.addSql('alter table "users" add column "deleted_at" timestamptz(0) null;');

    this.addSql('alter table "quiz" add column "deleted_at" timestamptz(0) null;');

    this.addSql('alter table "question" add column "deleted_at" timestamptz(0) null;');
  }

}
