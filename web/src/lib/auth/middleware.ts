import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

export function withAuth(handler: Function) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, error: 'No authorization token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.slice(7);
      const decoded = verifyToken(token);

      if (!decoded) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired token' },
          { status: 401 }
        );
      }

      // Добавить user info в request
      (req as any).user = decoded;

      return handler(req);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { success: false, error: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
