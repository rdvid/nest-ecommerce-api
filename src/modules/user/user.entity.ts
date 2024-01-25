import { Exclude } from 'class-transformer';
import { OrderEntity } from '../order/order.entity';
import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    PrimaryGeneratedColumn, 
    OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {

    constructor(user?: Partial<UserEntity>) {
        this.id = user?.id || "";
        this.name = user?.name || "";
        this.email = user?.email || "";
        this.password = user?.password || "";
        // this.orders = user?.orders || [];
        this.createdAt = user?.createdAt || "";
        this.updatedAt = user?.updatedAt || "";
        this.deletedAt = user?.deletedAt || "";
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    name: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @Exclude()
    @Column({ name: 'password', length: 255, nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at'})
    deletedAt: string;

    @OneToMany(()=> OrderEntity, (order) => order.user, { cascade: true, onDelete: 'CASCADE' })
    orders: OrderEntity[]
}   




   