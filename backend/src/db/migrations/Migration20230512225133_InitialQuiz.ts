import { Migration } from '@mikro-orm/migrations';

export class Migration20230512225133 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "message" cascade;');

    this.addSql('drop table if exists "match" cascade;');

    this.addSql('alter table "users" drop column "pet_type";');
    this.addSql('alter table "users" drop column "role";');
  }

  async down(): Promise<void> {
    this.addSql('create table "message" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "sender_id" int not null, "receiver_id" int not null, "message" varchar(255) not null);');

    this.addSql('create table "match" ("owner_id" int not null, "matchee_id" int not null, "created_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, constraint "match_pkey" primary key ("owner_id", "matchee_id"));');

    this.addSql('alter table "message" add constraint "message_sender_id_foreign" foreign key ("sender_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "message" add constraint "message_receiver_id_foreign" foreign key ("receiver_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "match" add constraint "match_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "match" add constraint "match_matchee_id_foreign" foreign key ("matchee_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users" add column "pet_type" varchar(255) not null, add column "role" text check ("role" in (\'Admin\', \'User\')) not null;');
  }

}
