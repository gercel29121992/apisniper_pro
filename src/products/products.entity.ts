import { Category } from "src/categories/category.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Products{

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name:string;
   
    @Column({nullable: true})
    estad:string;
   
    @Column()
    description:string;
   
    @Column()
    compventa: string;
   
    @Column({nullable: true})
    image1:string;
   
   
    @Column({nullable: true})
    image2:string;
   
   
    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    price:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    price1:number;
   
    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    price2:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    sl:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    tp1:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0}) 
    tp2:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    tp3:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    tp4:number;

    @Column({type: "decimal", precision: 20, scale: 10,default:0})
    tp5:number;


    @Column({default:0})
    tpactivate1:number;
    @Column({default:0})
    tpactivate2:number;
    @Column({default:0})
    tpactivate3:number;
    @Column({default:0})
    tpactivate4:number;
    @Column({default:0})
    tpactivate5:number;


    @Column()
    id_category:number;
    @Column()
    id_user:number;
    
    @Column()
    like:number;
    
    
    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    updated_at: Date;

   
    @ManyToOne(()=>Category,(category)=>category.id)
    @JoinColumn(  {name: 'id_category' })
    category: Category

    @ManyToOne(()=>User,(user)=>user.id)
    @JoinColumn(  {name: 'id_user' })
    user: User
}