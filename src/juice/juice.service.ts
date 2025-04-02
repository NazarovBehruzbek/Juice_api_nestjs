// src/juice/juice.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Juice } from './juice.interface';

@Injectable()
export class JuiceService {
  constructor(@InjectModel('Juice') private juiceModel: Model<Juice>) {}

  async create(juiceData: Juice): Promise<Juice> {
    const newJuice = new this.juiceModel(juiceData);
    return newJuice.save();
  }

  async findAll(): Promise<Juice[]> {
    return this.juiceModel.find().exec();
  }

  async findOne(id: string): Promise<Juice | null> {
    return this.juiceModel.findById(id).lean().exec();
  }

  // `update` metodini yangilash
  async update(id: string, juiceData: Juice): Promise<Juice | null> {
    // `findByIdAndUpdate` metodi yangi yangilangan obyektni qaytaradi
    const updatedJuice = await this.juiceModel.findByIdAndUpdate(id, juiceData, {
      new: true,  // yangilangan obyektni qaytarish
      runValidators: true,  // validatsiya qilish
    }).lean().exec();  // lean() orqali faqat obyekt qaytarish

    return updatedJuice;  // Yangilangan Juice yoki null
  }

  async remove(id: string): Promise<any> {
    return this.juiceModel.findByIdAndDelete(id).exec();
  }
}
