import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 55 })
  name: string;
  @Column({ length: 55 })
  last_name: string;
  @Column({ length: 12 })
  phone: string;
  @Column()
  email: string;
}
