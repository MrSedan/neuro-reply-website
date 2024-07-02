import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WebUser {
  @PrimaryGeneratedColumn("uuid")
  public uuid: string;

  @Column({ unique: true })
  public login: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: true })
  public telegram_id?: string;
}
