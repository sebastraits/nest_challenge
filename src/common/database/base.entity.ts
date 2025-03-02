import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export class Base extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Exclude()
  readonly createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude()
  readonly updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  @Exclude()
  deletedAt!: Date;
}
