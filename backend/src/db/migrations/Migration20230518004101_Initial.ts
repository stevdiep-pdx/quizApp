import { Migration } from '@mikro-orm/migrations';

export class Migration20230518004101 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "email" varchar(255) not null, "name" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "quiz" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "deleted_at" timestamptz(0) null, "creator_id" int not null, "name" varchar(255) not null);');

    this.addSql('alter table "quiz" add constraint "quiz_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');
  }

}
