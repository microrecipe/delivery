import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDelivery } from '../deliveries.interface';
import { DeliveryCourier } from './delivery-courier.entity';

export type DeliveryStatus = 'ordered' | 'routed' | 'finished';

@Entity('deliveries')
export class Delivery implements IDelivery {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'order_id',
    type: 'int',
    nullable: true,
  })
  orderId: number;

  @Column({
    name: 'delivery_status',
    type: 'enum',
    enum: ['ordered', 'routed', 'finished'],
    nullable: true,
  })
  deliveryStatus: DeliveryStatus;

  @ManyToOne(() => DeliveryCourier, {
    nullable: true,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'courier_id' })
  courier: DeliveryCourier;

  @Column({
    name: 'address',
    type: 'varchar',
    nullable: true,
  })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
