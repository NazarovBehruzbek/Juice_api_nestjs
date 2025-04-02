// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';  // Payload interfeysini import qilish

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Foydalanuvchi autentifikatsiyasini amalga oshirish
  async login(user: { username: string }) {
    const payload: JwtPayload = { username: user.username };  // Payloadni yaratish
    return {
      access_token: this.jwtService.sign(payload),  // JWT yaratish
    };
  }

  // Foydalanuvchi tekshiruvi (masalan, "admin" bo'lsa ruxsat)
  async validateUser(payload: JwtPayload): Promise<any> {
    // Agar username 'admin' bo'lmasa, null qaytaradi
    if (payload.username !== 'admin') {
      return null;  // Foydalanuvchi 'admin' emas bo'lsa null qaytaring
    }
    return { username: payload.username };  // faqat 'admin' uchun ruxsat
  }
}
