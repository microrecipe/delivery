import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('delivery_couriers')
export class DeliveryCourier {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: true,
  })
  name: string;

  @Column({
    name: 'shipping_cost',
    type: 'float',
    nullable: true,
  })
  shippingCost: number;
}
