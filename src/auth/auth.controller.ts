// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: { username: string }) {
    // Faqat username orqali tekshiruv
    if (user.username !== 'admin') {
      throw new Error('Invalid username');  // Faqat 'admin' username bo'lsa, token yaratiladi
    }
    const result = await this.authService.login(user);
    return result;  // Token qaytariladi
  }
}
