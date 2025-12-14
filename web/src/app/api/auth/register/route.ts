import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Валидация
    if (!username || !email || !password) {
      return NextResponse.json(
        errorResponse('Missing required fields: username, email, password'),
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        errorResponse('Password must be at least 6 characters'),
        { status: 400 }
      );
    }

    // Проверить, что пользователь не существует
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        errorResponse('User already exists with this email or username'),
        { status: 409 }
      );
    }

    // Хешировать пароль
    const passwordHash = await hashPassword(password);

    // Создать пользователя в БД
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: passwordHash,
        role: 'DEVELOPER' // Новые пользователи - разработчики по умолчанию
      }
    });

    // Генерировать токен
    const token = generateToken(user.id, user.email, user.role);

    return NextResponse.json(
      successResponse({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
}
