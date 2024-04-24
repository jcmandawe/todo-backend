import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://root:root@todo.fkn1v3q.mongodb.net/?retryWrites=true&w=majority&appName=todo',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
