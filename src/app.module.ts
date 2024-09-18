import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://naeemmemon60650:FJaWZyfA8uSVXlsN@nestmongo.cosnw.mongodb.net/',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
