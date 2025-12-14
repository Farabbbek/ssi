import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

export function generateToken(userId: string, email: string, role: string) {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function decodeToken(token: string) {
  return jwt.decode(token);
}
