import { Migration } from '@mikro-orm/migrations';

export class Migration20230611011023 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "leaderboard" drop constraint "leaderboard_player_id_foreign";');

    this.addSql('alter table "leaderboard" add constraint "leaderboard_player_id_foreign" foreign key ("player_id") references "users" ("id") on update set null on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "leaderboard" drop constraint "leaderboard_player_id_foreign";');

    this.addSql('alter table "leaderboard" add constraint "leaderboard_player_id_foreign" foreign key ("player_id") references "users" ("id") on update cascade;');
  }

}
