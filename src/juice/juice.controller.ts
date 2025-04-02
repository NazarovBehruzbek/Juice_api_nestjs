import { Controller, Get, Post, Body, Param, Delete, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { JuiceService } from './juice.service';
import { Juice } from './juice.interface';  // Juice interfeysini import qilish
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('juice')
export class JuiceController {
  constructor(private readonly juiceService: JuiceService) { }

  // Juice yaratish va fayl yuklash
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',  // Yuklangan fayllar manzili
        filename: (req, file, callback) => {
          const fileName = `${uuidv4()}.${file.originalname.split('.').pop()}`; // Fayl nomini generatsiya qilish
          callback(null, fileName); // Yangi fayl nomi bilan saqlash
        },
      }),
    }),
  )
  async create(
    @Body() juiceData: Juice,
    @UploadedFile() file: any,  // Faylni olish uchun `any` turini ishlatish
  ): Promise<Juice> {
    // Yuklangan fayl manzilini `juiceData`ga qo'shish
    juiceData.imagePath = file.filename;  // Rasm manzilini qo'shish
    return this.juiceService.create(juiceData);  // `juiceData` ni yaratish
  }

  // Barcha juice'larni olish
  @Get()
  async findAll(): Promise<Juice[]> {
    return this.juiceService.findAll();
  }

  // ID bo'yicha juice topish
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Juice | null> {
    return this.juiceService.findOne(id);
  }

  // Juice yangilash
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() juiceData: Juice,
  ): Promise<Juice | null> {
    return this.juiceService.update(id, juiceData);
  }

  // Juice o'chirish
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.juiceService.remove(id);
  }
}
