import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';


 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'sql10.freesqldatabase.com',
      port: 3306,
      username: 'sql10682397',
      password: 'tPEfSsBS25',
      database: 'sql10682397',
      entities: [__dirname + '/**/*.entity{.ts,.js}' ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ProductsModule,
   
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
