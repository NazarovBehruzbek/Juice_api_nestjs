// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWTni Authorization headerdan olish
      secretOrKey: 'secretKey', // JWTni tekshirish uchun foydalaniladigan maxfiy kalit
    });
  }

  // `validateUser` metodini ishlatish
  async validate(payload: JwtPayload) {
    return this.authService.validateUser(payload); // AuthService'dagi validateUser'ni chaqirish
  }
}
