import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { userService } from '@/lib/db/services/userService';
import { successResponse, errorResponse } from '@/lib/utils/response';

const getHandler = withAuth(async (req: NextRequest) => {
  try {
    const user = (req as any).user;

    const userData = await userService.getUser(user.userId);

    if (!userData) {
      return NextResponse.json(
        errorResponse('User not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(successResponse(userData));
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

export { getHandler as GET };
