import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProxyInfo {
  constructor(props?: Partial<ProxyInfo>) {
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn("uuid")
  public uuid!: string;

  @Column()
  public enabled: boolean;

  @Column()
  public text: string;
}
