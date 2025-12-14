import { NextRequest, NextResponse } from 'next/server';
import { comparePassword } from '@/lib/auth/password';
import { generateToken } from '@/lib/auth/jwt';
import { prisma } from '@/lib/db/prisma';
import { successResponse, errorResponse } from '@/lib/utils/response';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Валидация
    if (!email || !password) {
      return NextResponse.json(
        errorResponse('Email and password required'),
        { status: 400 }
      );
    }

    // Найти пользователя
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }

    // Проверить пароль
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        errorResponse('Invalid password'),
        { status: 401 }
      );
    }

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
      })
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
}
