import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtRole } from 'src/auth/jwt/jwt-Rol';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { CreateProductsDto } from './dto/Create-Products.dto';
import { UpdateProductsDto } from './dto/update-Products.dto copy';

@Controller('products')
export class ProductsController {

constructor(private producservices: ProductsService){}

@HasRoles(JwtRole.ADMIN,JwtRole.CLIENT)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Get()
finAll() {
 
  return this.producservices.findAll();
}



@HasRoles(JwtRole.ADMIN,JwtRole.CLIENT)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Get('category/:id_category')
finAllCategory(@Param('id_category',ParseIntPipe) id_category:number,) {
 
  return this.producservices.findAllCategory(id_category);
}
 

@HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Post()
@UseInterceptors(FilesInterceptor('files[]',2))
create(@UploadedFiles( 
  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1024*1024*10 }),
      new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
    ],
  }),
) files: Array<Express.Multer.File>,
 @Body() product:CreateProductsDto) {
 
  return this.producservices.create(files,product);
}




@HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Put('upload/:id')
@UseInterceptors(FilesInterceptor('files[]',2))
Updatewithimage(@UploadedFiles( 
  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 1024*1024*10 }),
      new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
    ],
  }),
) files: Array<Express.Multer.File>,
@Param('id',ParseIntPipe) id:number,
 @Body() product:UpdateProductsDto) {
 
  return this.producservices.updateWithImage(id,files,product);
}



@HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Put(':id')
 
Update ( 
@Param('id',ParseIntPipe) id:number,
 @Body() product:UpdateProductsDto) {
 
  return this.producservices.update(id,  product);
}



@HasRoles(JwtRole.ADMIN)
@UseGuards(JwtAuthGuard ,JwtRolesGuard)
@Delete(':id')
 
delete ( 
@Param('id',ParseIntPipe) id:number)
  {
 
  return this.producservices.delete(id);
}
}
