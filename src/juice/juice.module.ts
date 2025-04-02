// src/juice/juice.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JuiceService } from './juice.service';
import { JuiceController } from './juice.controller';
import { JuiceSchema } from './juice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Juice', schema: JuiceSchema }]),
  ],
  providers: [JuiceService],
  controllers: [JuiceController],
})
export class JuiceModule {}
