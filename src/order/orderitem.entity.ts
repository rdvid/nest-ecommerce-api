import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    ManyToMany,
    UpdateDateColumn} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

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

    @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
        cascade: ['update']
    })
    product: ProductEntity

}




   