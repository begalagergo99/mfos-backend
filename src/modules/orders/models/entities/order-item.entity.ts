import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MenuItem } from '../../../restaurants/models/entities/menu-item.entity';
import { Order } from './order.entity';

@Entity('order_items')
@Check('"price_snapshot" >= 0')
@Check('"quantity" > 0')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 160, name: 'name_snapshot' })
  nameSnapshot!: string;

  @Column({ type: 'integer', name: 'price_snapshot' })
  priceSnapshot!: number;

  @Column({ type: 'integer' })
  quantity!: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt!: Date;

  @Index()
  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @Index()
  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'menu_item_id' })
  menuItem!: MenuItem | null;
}
