import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToMany, ManyToOne } from 'typeorm';
import { OrderStatus } from './enum/orderstatus.enum';
import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './orderitem.entity';

@Entity({ name: 'orders' })
export class OrderEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'total_amount', nullable: false })
    totalAmount: number;

    @Column({ name: 'status', enum: OrderStatus, nullable: false })
    status: OrderStatus;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at'})
    deletedAt: string;

    @ManyToOne(()=>UserEntity, (user)=>user.orders)
    user: UserEntity

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
        cascade: true
    })
    orderItems: OrderItemEntity[]

}




   