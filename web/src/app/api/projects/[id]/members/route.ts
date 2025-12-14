import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { projectService } from '@/lib/db/services/projectService';
import { successResponse, errorResponse } from '@/lib/utils/response';

const getHandler = withAuth(async (req: NextRequest) => {
  try {
    const projectId = req.nextUrl.pathname.split('/').filter(Boolean)[1]; // /api/projects/[id]/members

    if (!projectId) {
      return NextResponse.json(
        errorResponse('Project ID is required'),
        { status: 400 }
      );
    }

    const members = await projectService.getProjectMembers(projectId);

    return NextResponse.json(successResponse(members));
  } catch (error) {
    console.error('Get project members error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

const postHandler = withAuth(async (req: NextRequest) => {
  try {
    const projectId = req.nextUrl.pathname.split('/').filter(Boolean)[1];

    if (!projectId) {
      return NextResponse.json(
        errorResponse('Project ID is required'),
        { status: 400 }
      );
    }

    const { userId, role } = await req.json();

    if (!userId || !role) {
      return NextResponse.json(
        errorResponse('userId and role are required'),
        { status: 400 }
      );
    }

    const member = await projectService.addProjectMember(projectId, userId, role);

    return NextResponse.json(successResponse(member), { status: 201 });
  } catch (error) {
    console.error('Add project member error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

export { getHandler as GET, postHandler as POST };
