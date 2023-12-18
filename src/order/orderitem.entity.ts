import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'order_items' })
export class OrderItemEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'sell_price', nullable: false })
    sellPrice: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    order:OrderEntity

}




   