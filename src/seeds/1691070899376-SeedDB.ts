import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1691070899376 implements MigrationInterface {
  name = 'SeedDB1691070899376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$XxzgyTFivQILkvLKPt6xK.YqSeGKyl.oF7rQhnYPf.oRCsfii7HwC')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'First article description', 'first article body', 'coffee, dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'Second article description', 'second article body', 'coffee, dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
