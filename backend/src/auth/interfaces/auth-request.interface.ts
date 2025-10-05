import { Request } from 'express';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../strategies/jwt.strategy';

// Definimos el tipo de objeto que se inyecta en req.user después de JwtStrategy.validate
interface AuthenticatedUser extends Omit<User, 'password' | 'hashPassword' | 'comparePassword' | 'tasks'> {
    id: number;
    email: string;
}

// Extendemos la interfaz de Request para incluir el objeto 'user'
export interface AuthRequest extends Request {
  user: AuthenticatedUser;
}