import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity'; // RUTA CORREGIDA

export interface JwtPayload {
  email: string;
  id: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // La información decodificada del JWT (payload) se pasa aquí.
  async validate(payload: JwtPayload): Promise<User> {
    // Aquí podrías buscar el usuario en la DB si fuera necesario,
    // pero para nuestro caso, solo retornamos la información esencial.
    return { id: payload.id, email: payload.email } as User;
  }
}