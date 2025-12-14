import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { projectService } from '@/lib/db/services/projectService';
import { successResponse, errorResponse } from '@/lib/utils/response';

const getHandler = withAuth(async (req: NextRequest) => {
  try {
    const user = (req as any).user;
    const { searchParams } = new URL(req.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '10');

    const projects = await projectService.getUserProjects(user.userId, skip, take);

    return NextResponse.json(successResponse(projects));
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

const postHandler = withAuth(async (req: NextRequest) => {
  try {
    const user = (req as any).user;
    const { name, description, repo_path, is_private } = await req.json();

    if (!name || !repo_path) {
      return NextResponse.json(
        errorResponse('Name and repo_path are required'),
        { status: 400 }
      );
    }

    const project = await projectService.createProject({
      name,
      description,
      repo_path,
      is_private,
      created_by_id: user.userId
    });

    return NextResponse.json(successResponse(project), { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

export { getHandler as GET, postHandler as POST };
