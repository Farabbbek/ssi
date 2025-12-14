import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/middleware';
import { projectService } from '@/lib/db/services/projectService';
import { successResponse, errorResponse } from '@/lib/utils/response';

const getHandler = withAuth(async (req: NextRequest) => {
  try {
    const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

    if (!id) {
      return NextResponse.json(
        errorResponse('Project ID is required'),
        { status: 400 }
      );
    }

    const project = await projectService.getProject(id);

    if (!project) {
      return NextResponse.json(
        errorResponse('Project not found'),
        { status: 404 }
      );
    }

    return NextResponse.json(successResponse(project));
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

const putHandler = withAuth(async (req: NextRequest) => {
  try {
    const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

    if (!id) {
      return NextResponse.json(
        errorResponse('Project ID is required'),
        { status: 400 }
      );
    }

    const { name, description, is_private } = await req.json();

    const project = await projectService.updateProject(id, {
      name,
      description,
      is_private
    });

    return NextResponse.json(successResponse(project));
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

const deleteHandler = withAuth(async (req: NextRequest) => {
  try {
    const id = req.nextUrl.pathname.split('/').filter(Boolean).pop();

    if (!id) {
      return NextResponse.json(
        errorResponse('Project ID is required'),
        { status: 400 }
      );
    }

    await projectService.deleteProject(id);

    return NextResponse.json(successResponse({ message: 'Project deleted' }));
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      errorResponse('Internal server error', 500),
      { status: 500 }
    );
  }
});

export {
  getHandler as GET,
  putHandler as PUT,
  deleteHandler as DELETE
};
