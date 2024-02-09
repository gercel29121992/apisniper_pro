import { HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import { UpdateProductsDto } from './dto/update-Products.dto copy';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/Create-Products.dto';
import { dataidDto } from './dto/dataid.dto';
 
import async_foreach = require('../utils/async_foreach') ;
import  storage = require('../utils/cloud_storage') ;
import { activatetpDto } from './dto/activatetp.dto';
import { datalikeDto } from './dto/datalike.dto';
@Injectable()
export class ProductsService {

constructor (@InjectRepository(Products) private producRepository: Repository<Products>){}


findAll(){
    return this.producRepository.find();
}


findAllCategory(id_category:number){
    return this.producRepository.findBy({id_category:id_category});
}

findid(id:number){
    return this.producRepository.findBy({id:id});
}


async create(files: Array<Express.Multer.File>,product: CreateProductsDto){   
    if (files.length===0 ){
        throw new HttpException("las imagene son obligatorias",HttpStatus.NOT_FOUND);
     
       }
     
       let uploadedFile=0;
       const newproduct = this.producRepository.create(product);
       const saveProduct= await this.producRepository.save(newproduct);
    
    const startforeach=async () => {
        await async_foreach(files,async(file:Express.Multer.File)=>{

            const url =await storage(file,file.originalname);

            if(url !==undefined && url!==null)
            {
                if(uploadedFile===0){
                    saveProduct.image2=url;
                }else  if(uploadedFile===1){
                    //saveProduct.image2=url;
                }
    
            }
            await this.update(saveProduct.id,saveProduct);
            uploadedFile=uploadedFile+1;
           

        })
       
        
    }
    await startforeach();
   
    return saveProduct;

   }





   async updateWithImage(id: number,files: Array<Express.Multer.File>,product: UpdateProductsDto){   
    console.log(product);
    if (files.length===0 ){
        throw new HttpException("las imagenes son obligatorias",HttpStatus.NOT_FOUND);
     
       }
       let counter =0;
       let imagentoupdatelist = JSON.parse(product.image_To_update);
       let uploadedFile=imagentoupdatelist[counter];
      
       const updateproduct = await this.update(id,product);
     
    
    const startforeach=async () => {
        await async_foreach(files,async(file:Express.Multer.File)=>{

            const url =await storage(file,file.originalname);

            if(url !==undefined && url!==null)
            {
                if(uploadedFile===0){
                    updateproduct.image1=url;
                }else  if(uploadedFile===1){
                    updateproduct.image2=url;
                }
    
            }
            await this.update(updateproduct.id,updateproduct);
            counter++;
            uploadedFile=imagentoupdatelist[counter];
           

        })
       
        
    }
    await startforeach();
   
    return updateproduct;

   }


    async update(id: number,product: UpdateProductsDto){
    console.log(product);

     const productsFound = await this.producRepository.findOneBy({id:id})
   if (!productsFound ){
    throw new HttpException("producto no encontrado",HttpStatus.NOT_FOUND);

   }

   const updateproducts= Object.assign(productsFound, product);
   return this.producRepository.save(updateproducts);

    }

    async activatetp(data:activatetpDto){
         
    
         const productsFound = await this.producRepository.findOneBy({id:Number(data.id)})
       if (!productsFound ){
        throw new HttpException("producto no encontrado",HttpStatus.NOT_FOUND);
    
       }
       if(Number(data.numero)==1){
        productsFound.tpactivate1=true;
       }
       if(Number(data.numero)==2){
        productsFound.tpactivate2=true;
       }
       if(Number(data.numero)==3){
        productsFound.tpactivate3=true;
       }
       if(Number(data.numero)==4){
        productsFound.tpactivate4=true;
       }
       if(Number(data.numero)==5){
        productsFound.tpactivate5=true;
       }
    
 
       const respu= this.producRepository.save(productsFound);
       if(respu){ return true;}else{return false}
    
        }

    async delete(id: number){
        const productsFound = await this.producRepository.findOneBy({id:id})
      if (!productsFound ){
       throw new HttpException("producto no encontrado",HttpStatus.NOT_FOUND);
   
      }
   
    
      return this.producRepository.delete(id);
   
       }



       async like(id: number,datalike:datalikeDto){
        const productsFound = await this.producRepository.findOneBy({id:id})
      if (!productsFound ){
       throw new HttpException("producto no encontrado",HttpStatus.NOT_FOUND);
   
      }


      if(datalike.numero==0){return productsFound.like;}
      productsFound.like=productsFound.like+1;
      const respu= this.producRepository.save(productsFound);


      if(respu){ return productsFound.like;}else{return 0;}
      
   
       }


       async getproductiduseridcategory(data: dataidDto){
        return await this.producRepository.findBy({id_category:Number(data.id_category),id_user:Number(data.id_user)});
       }
}
